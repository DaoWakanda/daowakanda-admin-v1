'use client';

import { useProposalActions } from '@/actions/proposal';
import { BackgroundOverlay } from '@/components/background-overlay';
import { Spinner } from '@/components/spinner';
import { useDebounce } from '@/hooks/use-debounce';
import { IAsset } from '@/interface/proposal.interface';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineErrorOutline } from 'react-icons/md';

interface Props {
  onClose: () => void;
  refresh?: () => void;
}

export const AddAssetModal = ({ onClose, refresh }: Props) => {
  const [asaId, setAsaId] = useState('');
  const { getAssetInformation, addAssetToProposalWhitelist } = useProposalActions();
  const [assetInfo, setAssetInfo] = useState<IAsset>();
  const [loadingAsset, setLoadingAsset] = useState(false);
  const [loading, setLoading] = useState(false);
  const { debounce } = useDebounce();

  const getAsset = async () => {
    if (!asaId) {
      setLoadingAsset(false);
      setAssetInfo(undefined);
      return;
    }

    setLoadingAsset(true);
    const response = await getAssetInformation(asaId);
    setAssetInfo(response);
    setLoadingAsset(false);
  };

  const debouncedSearch = debounce(() => {
    getAsset();
  });

  const onSubmit = async () => {
    if (loading) return;

    setLoading(true);
    const response = await addAssetToProposalWhitelist(asaId);
    setLoading(false);

    if (response) {
      toast.success('Asset added to proposal whitelist successfully');
      refresh?.();
      onClose();
    }
  };

  const canSubmit = !!asaId && !loadingAsset && !!assetInfo;

  useEffect(() => {
    debouncedSearch();
  }, [asaId]);

  return (
    <BackgroundOverlay visible onClose={onClose}>
      <div
        className={classNames(
          'flex flex-col bg-[#101010] rounded-[32px] min-h-[400px] p-8 gap-6',
          'border-[1px] border-[#ff] w-[500px] max-w-[90%]',
        )}
      >
        <div className={classNames('font-[700] text-white font-avenir text-2xl')}>Add asset</div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-poppins text-sm font-[400] text-[#919094]">Asa ID</label>
            <div
              className={classNames(
                'flex flex-row items-center gap-3',
                'bg-[#2F3033] py-[10px] px-4 rounded-lg text-white outline-none w-[100%]',
              )}
            >
              <input
                type="text"
                className="bg-transparent outline-none flex-1"
                value={asaId}
                onChange={(e) => setAsaId(e.target.value)}
                placeholder="Please enter a valid ASA ID"
              />

              {loadingAsset && <Spinner />}
              {!loadingAsset && !!assetInfo && <FiCheckCircle color="#33d5ba" />}
              {!loadingAsset && !assetInfo && !!asaId && <MdOutlineErrorOutline color="red" />}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-poppins text-sm font-[400] text-[#919094]">Asset Name</label>
            <div
              className={classNames(
                'flex flex-row items-center gap-3',
                'bg-[#2F3033] py-[10px] px-4 rounded-lg text-[#919094] outline-none w-[100%]',
              )}
            >
              <input
                type="text"
                className="bg-transparent outline-none flex-1"
                value={assetInfo?.name || '---'}
                placeholder="Asset name"
                disabled={true}
              />
              {loadingAsset && <Spinner />}
              {!loadingAsset && !!assetInfo && <FiCheckCircle color="#33d5ba" />}
              {!loadingAsset && !assetInfo && !!asaId && <MdOutlineErrorOutline color="red" />}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-poppins text-sm font-[400] text-[#919094]">
              Asset Unit Name
            </label>
            <div
              className={classNames(
                'flex flex-row items-center gap-3',
                'bg-[#2F3033] py-[10px] px-4 rounded-lg text-[#919094] outline-none w-[100%]',
              )}
            >
              <input
                type="text"
                className="bg-transparent outline-none flex-1"
                value={assetInfo?.unit_name || '---'}
                placeholder="Asset unit name"
                disabled={true}
              />
              {loadingAsset && <Spinner />}
              {!loadingAsset && !!assetInfo && <FiCheckCircle color="#33d5ba" />}
              {!loadingAsset && !assetInfo && !!asaId && <MdOutlineErrorOutline color="red" />}
            </div>
          </div>
        </div>

        <div
          className={classNames(
            'flex items-center justify-center bg-[#c5ee4f] py-4 rounded-lg h-[56px] w-full',
            'text-[#002201] font-[500] font-roboto text-base',
            !canSubmit || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          )}
          onClick={onSubmit}
        >
          {loading ? <Spinner color="#002201" /> : `Add Asset`}{' '}
        </div>
      </div>
    </BackgroundOverlay>
  );
};
