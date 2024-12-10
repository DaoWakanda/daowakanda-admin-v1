import { useChallengeActions } from '@/actions';
import { BackgroundOverlay } from '@/components/background-overlay';
import { Spinner } from '@/components/spinner';
import { ISubmission } from '@/interface/challenge.interface';
import { RefreshSubmissionsAtom } from '@/state/challenge.atom';
import classNames from 'classnames';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';

interface Props {
  data: ISubmission;
}

export const SubmissionActions = ({ data }: Props) => {
  const [options, setOptions] = useState(false);
  const [loading, setLoading] = useState<'approve' | 'reject' | 'disburse'>();
  const setRefresh = useSetRecoilState(RefreshSubmissionsAtom);
  const { updateSubmissionStatusById, markSubmissionAsDisbursed } = useChallengeActions();

  const handleUpdateStatus = async (type: 'approve' | 'reject') => {
    if (loading) return;

    setLoading(type);
    const res = await updateSubmissionStatusById(
      data.id,
      type === 'approve' ? 'approved' : 'rejected',
    );

    setLoading(undefined);

    if (res) {
      setRefresh((old) => old + 1);
      toast.success(
        `The submission was ${type === 'approve' ? 'approved' : 'rejected'} successfully!`,
      );
    }
  };

  const handleDisburse = async () => {
    if (loading) return;

    setLoading('disburse');
    const res = await markSubmissionAsDisbursed(data.id);

    setLoading(undefined);

    if (res) {
      setRefresh((old) => old + 1);
      toast.success('The submission was disbursed successfully! ');
    }
  };

  const toggleOptions = () => {
    setOptions(!options);
  };

  return (
    <div className="relative flex justify-center items-center h-[50px] min-w-[50px]">
      {(data.submissionStatus === 'pending' || data.disbursementStatus === 'eligible') && (
        <div
          className={classNames('w-full flex justify-center items-center cursor-pointer')}
          onClick={toggleOptions}
        >
          <BsThreeDotsVertical />
        </div>
      )}

      {options &&
        (data.submissionStatus === 'pending' || data.disbursementStatus === 'eligible') && (
          <BackgroundOverlay
            onClose={() => {
              if (!loading) setOptions(false);
            }}
          >
            <div
              className={classNames(
                'flex flex-col w-[180px]',
                'rounded-lg bg-white overflow-hidden',
              )}
              style={{
                boxShadow:
                  '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
              }}
            >
              {data.submissionStatus === 'pending' && (
                <>
                  <div
                    onClick={() => {
                      handleUpdateStatus('approve');
                    }}
                    className={classNames(
                      'flex px-[14px] py-3 items-center justify-center gap-2 cursor-pointer',
                      'text-[#001620] font-roboto text-sm font-[500]',
                      'hover:bg-[#f9fbff]',
                    )}
                  >
                    {loading !== 'approve' ? 'Approve submission' : <Spinner color="#001620" />}
                  </div>
                  <div
                    onClick={() => {
                      handleUpdateStatus('reject');
                    }}
                    className={classNames(
                      'flex px-[14px] py-3 items-center justify-center gap-2 cursor-pointer',
                      'text-[#001620] font-roboto text-sm font-[500]',
                      'hover:bg-[#f9fbff]',
                    )}
                  >
                    {loading !== 'reject' ? 'Reject submission' : <Spinner color="#001620" />}
                  </div>
                </>
              )}

              {data.disbursementStatus === 'eligible' && (
                <div
                  onClick={() => {
                    handleDisburse();
                  }}
                  className={classNames(
                    'flex px-[14px] py-3 items-center justify-center gap-2 cursor-pointer',
                    'text-[#001620] font-roboto text-sm font-[500]',
                    'hover:bg-[#f9fbff]',
                  )}
                >
                  {loading !== 'disburse' ? 'Mark as disbursed' : <Spinner color="#001620" />}
                </div>
              )}
            </div>
          </BackgroundOverlay>
        )}
    </div>
  );
};
