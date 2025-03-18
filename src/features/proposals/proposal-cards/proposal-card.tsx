import Skeleton from 'react-loading-skeleton';
import styles from './index.module.scss';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IProposal } from '@/interface/proposal.interface';
import { useEffect, useState } from 'react';
import { calculateCountdown } from '@/utils/calculate-countdown';
import toast from 'react-hot-toast';
import { RefreshProposalAtom } from '@/state/proposal.atom';
import { useSetRecoilState } from 'recoil';
import { useProposalActions } from '@/actions/proposal';
import { PromptModal } from '@/components/prompt-modal';
import Link from 'next/link';
import { DeleteProposalModal } from './delete-proposal-modal';
import { maskString } from '@/utils';

interface Props {
  proposal: IProposal;
}

export const ProposalCard = ({ proposal }: Props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [countdown, setCountdown] = useState('00:00:00:00');
  const [deleting, setDeleting] = useState(false);
  const setRefresh = useSetRecoilState(RefreshProposalAtom);
  const { deleteProposal } = useProposalActions();
  const endTime = proposal?.endDate || 0;

  const onDelete = async () => {
    if (deleting) return;

    setDeleting(true);
    const response = await deleteProposal(proposal?.appId);
    setDeleting(false);

    if (response) {
      toast.success('Challenge deleted successfully');
      setRefresh((old) => old + 1);
      setDeleteModal(false);
    }
  };

  const statusCheck = () => {
    if (proposal?.ongoing) {
      return `Active`;
    } else if (proposal?.yesVotes?.length > proposal?.noVotes?.length) {
      return `Approved`;
    } else {
      return `Denied`;
    }
  };

  const progressBarStyles = proposal?.ongoing
    ? 'progress-reading-active'
    : proposal?.yesVotes?.length > proposal?.noVotes?.length
    ? 'progress-reading-approved'
    : 'progress-reading-denied';

  const progressBarWdith = (proposal?.yesVotes?.length / proposal?.registeredVoters?.length) * 100;
  const timerText = proposal?.ongoing ? countdown : `Ended`;
  const styleStatus =
    statusCheck() == `Active`
      ? 'status-active'
      : statusCheck() == `Approved`
      ? 'status-approved'
      : 'status-denied';
  const timerStatus =
    statusCheck() == `Active`
      ? 'timer-active'
      : statusCheck() == `Approved`
      ? 'timer-approved'
      : 'timer-denied';

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(() => {
        const countdownTime = calculateCountdown(Number(endTime));

        if (countdownTime === '00:00:00:00') {
          clearInterval(interval);
          return 'Ended';
        }

        return countdownTime;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className={styles['proposal-card-container']}>
        <div className={styles['header']}>
          <Link className={styles['title']} href={`/dashboard/proposals/${proposal?.appId}`}>
            {proposal?.title}
          </Link>
          <div className={styles['delete-btn']} onClick={() => setDeleteModal(true)}>
            <RiDeleteBinLine className={styles['delete-icon']} />
          </div>
        </div>
        <div className={styles['timer-status-info']}>
          <div className={styles['status']}>
            <div className={styles['tag']}>#37</div>
            <div className={styles[styleStatus]}>{statusCheck()}</div>
          </div>
          <div className={styles[timerStatus]}>{timerText}</div>
        </div>
        <div className={styles['bottom-info']}>
          <div className={styles['description']}>{proposal?.description}</div>
          <div className={styles['vote-info']}>
            <div className={styles['progress-info']}>
              <div className={styles['voting-result']}>
                <div className={styles['vote-text']}>{`Yes(${proposal?.yesVotes?.length}%)`}</div>
                <div className={styles['vote-text']}>{`No(${proposal?.noVotes?.length}%)`}</div>
              </div>
              <div className={styles['progress-bar']}>
                <div
                  className={styles[progressBarStyles]}
                  style={{
                    width: `${progressBarWdith}%`,
                    borderTopRightRadius: progressBarWdith == 100 ? 8 : 0,
                    borderBottomRightRadius: progressBarWdith == 100 ? 8 : 0,
                  }}
                ></div>
              </div>
            </div>
            <div className={styles['vote-count-info']}>
              <div className={styles['creator-info']}>
                <div className={styles['created-text']}>By{' '} {maskString(proposal?.creator)}</div>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1725207509/Frame_144_e7mnip.png"
                  alt="icon"
                />
              </div>
              <div className={styles['count-info']}>
                Total Votes: <span>{proposal?.registeredVoters?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteProposalModal
        title="Confirm Delete?"
        onClose={() => setDeleteModal(false)}
        visible={deleteModal}
        description=" Deleting this proposal means losing the voting progress.  Are you sure you want to delete?"
        noButtonText="No, Cancel"
        yesButtonText="Yes, Delete"
        yesAction={onDelete}
        noAction={() => setDeleteModal(false)}
        loading={deleting}
      />
    </>
  );
};

export function ProposalCardLoader() {
  return (
    <>
      <div className={styles['proposal-card-container']}>
        <div className={styles['header']}>
          <div className={styles['title']}>
            <Skeleton highlightColor="#353C52" baseColor="#576183" width={200} height={28} />
          </div>
          <div className={styles['delete-btn']}>
            <Skeleton highlightColor="#353C52" baseColor="#576183" width={32} height={32} />
          </div>
        </div>
        <div className={styles['timer-status-info']}>
          <div className={styles['status']}>
            <Skeleton highlightColor="#353C52" baseColor="#576183" width={110} height={20} />
          </div>
          <div className={styles['timer']}>
            <Skeleton highlightColor="#353C52" baseColor="#576183" width={80} height={20} />
          </div>
        </div>
        <div className={styles['bottom-info']}>
          <div className={styles['description']}>
            <Skeleton highlightColor="#353C52" baseColor="#576183" width={150} height={45} />
          </div>
          <div className={styles['vote-info']}>
            <div className={styles['progress-info']}>
              <div className={styles['voting-result']}>
                <div className={styles['voting-text']}>
                  <Skeleton highlightColor="#353C52" baseColor="#576183" width={30} height={16} />
                </div>
                <div className={styles['voting-text']}>
                  <Skeleton highlightColor="#353C52" baseColor="#576183" width={30} height={16} />
                </div>
              </div>

              <Skeleton
                highlightColor="#353C52"
                baseColor="#576183"
                width={150}
                height={8}
                borderRadius={8}
              />
            </div>
            <div className={styles['vote-count-info']}>
              <div className={styles['creator-info']}>
                <Skeleton highlightColor="#353C52" baseColor="#576183" width={50} height={16} />
              </div>
              <div className={styles['count-info']}>
                {' '}
                <Skeleton width={50} height={16} highlightColor="#353C52" baseColor="#576183" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
