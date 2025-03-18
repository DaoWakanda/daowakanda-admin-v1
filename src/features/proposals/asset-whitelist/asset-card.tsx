import Skeleton from 'react-loading-skeleton';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { IAsset } from '@/interface/proposal.interface';
import { useProposalActions } from '@/actions/proposal';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { PromptModal } from '@/components/prompt-modal';
import toast from 'react-hot-toast';

interface Props {
  asaId: string;
  refresh?: () => void;
}

export const AssetCard = (props: Props) => {
  const { asaId } = props;
  const [data, setData] = useState<IAsset>();
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const explorerUrl = `https://lora.algokit.io/${
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? 'mainnet' : 'testnet'
  }/asset/${asaId}`;

  const { getAssetInformation, removeAssetFromProposalWhitelist } = useProposalActions();

  const fetchInfo = async () => {
    setLoading(true);
    const res = await getAssetInformation(asaId);
    setLoading(false);

    if (res) {
      setData(res);
    }
  };

  const onDelete = async () => {
    if (deleting) return;

    setDeleting(true);
    const res = await removeAssetFromProposalWhitelist(asaId);
    setDeleting(false);

    if (res) {
      setShowOptions(false);
      setDeleteModal(false);
      toast.success('Asset removed from whitelist successfully');
      props.refresh?.();
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (loading) {
    return <AssetCardLoader />;
  }

  return (
    <div className={styles['card']}>
      <HiDotsVertical className={styles['toolbar-icon']} onClick={() => setShowOptions(true)} />

      <div className="flex flex-row items-center gap-4">
        <img
          src={
            data?.logo ||
            `https://ui-avatars.com/api/?name=${
              data?.name || asaId
            }&background=random&font-size=0.35&color=fff&rounded=true ⁠`
          }
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-row justify-between items-center flex-1">
          <div className="flex flex-col gap-1">
            <Link
              href={explorerUrl}
              target="_blank"
              className="flex flex-row items-center text-sm text-[#e6e6e6] font-[600] gap-2"
            >
              {asaId}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1"></div>

      <div className="font-poppins text-sm text-[#C7C7CC] font-[400] line-clamp-1">
        {data?.unit_name || ''}
      </div>
      <div className="text-[#fff] font-[700] font-poppins text-2xl line-clamp-2 flex flex-row items-center gap-2 justify-between">
        {data?.name || asaId}
        <div>{data?.verification_tier === 'verified' && <FiCheckCircle color="#33d5ba" />}</div>
      </div>

      {showOptions && (
        <div className={styles['edit-card-modal']}>
          <div className={styles['overlay']} onClick={() => setShowOptions(false)}></div>
          <div className={styles['wrapper']}>
            <div
              onClick={() => {
                setShowOptions(false);
                setDeleteModal(true);
              }}
              className={styles['content']}
            >
              Delete
            </div>
          </div>
        </div>
      )}

      <PromptModal
        title="Remove from Whitelist"
        onClose={() => setDeleteModal(false)}
        visible={deleteModal}
        description={`Are you sure you want to delete the ASA with id ${asaId} from your whitelist?`}
        noButtonText="Cancel"
        yesButtonText="Delete ASA"
        yesAction={onDelete}
        noAction={() => setDeleteModal(false)}
        loading={deleting}
      />
    </div>
  );
};

export function AssetCardLoader() {
  return (
    <>
      <div className={styles['card']}>
        <div className="font-poppins text-sm text-[#C7C7CC] font-[400] line-clamp-1">
          <Skeleton highlightColor="#353C52" baseColor="#576183" />
        </div>
        <div className="text-[#fff] font-[700] font-poppins text-2xl line-clamp-2">
          <Skeleton highlightColor="#353C52" baseColor="#576183" />
        </div>
        <div className="flex flex-row items-center justify-between gap-1 mt-1">
          <Skeleton
            borderRadius={18}
            height={18}
            width={18}
            highlightColor="#353C52"
            baseColor="#576183"
          />
          <div className="text-[#8E8E93] font-[600] text-sm font-roboto">
            <Skeleton width={50} highlightColor="#353C52" baseColor="#576183" />
          </div>
          <Skeleton width={50} highlightColor="#353C52" baseColor="#576183" />
        </div>
      </div>
    </>
  );
}
