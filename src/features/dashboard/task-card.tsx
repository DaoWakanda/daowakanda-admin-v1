import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { HiDotsVertical } from 'react-icons/hi';
import { StopWatchIcon } from '@/assets/stop-watch.icon';
import { ChallengeDifficultyIndicator } from '@/components/challenge-difficulty-indicator';
import { calculateCountdown } from '@/utils/calculate-countdown';
import { ITrivia } from '@/interface/challenge.interface';
import Skeleton from 'react-loading-skeleton';
import { EditTaskModal } from './edit-task-modal';
import { useSetRecoilState } from 'recoil';
import { RefreshChallengesAtom } from '@/state/challenge.atom';
import { useChallengeActions } from '@/actions/challenge';
import toast from 'react-hot-toast';
import { PromptModal } from '@/components/prompt-modal';

interface Props {
  challenge: ITrivia;
}

export function TaskCard({ challenge }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState('00:00:00:00');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { deleteChallenge } = useChallengeActions();
  const setRefresh = useSetRecoilState(RefreshChallengesAtom);

  const endTime = challenge.endTimeStamp || 0;

  const onDelete = async () => {
    if (deleting) return;

    setDeleting(true);
    const response = await deleteChallenge(challenge.id);
    setDeleting(false);

    if (response) {
      toast.success('Challenge deleted successfully');
      setRefresh((old) => old + 1);
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(() => {
        const countdownTime = calculateCountdown(endTime);

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
      <div className={styles['card']}>
        <HiDotsVertical className={styles['toolbar-icon']} onClick={() => setIsActive(true)} />
        <div className="font-poppins text-sm text-[#C7C7CC] font-[400] line-clamp-1">
          {challenge.skill}
        </div>
        <div className="text-[#fff] font-[700] font-poppins text-2xl line-clamp-2">
          {challenge.title}
        </div>
        <div className="flex flex-row items-center justify-between gap-1 mt-1">
          <div>
            <StopWatchIcon />
          </div>
          <div className="text-[#8E8E93] font-[600] text-sm font-roboto">{countdown}</div>
          <ChallengeDifficultyIndicator difficulty={challenge.difficulty} />
        </div>

        {isActive && (
          <div className={styles['edit-card-modal']}>
            <div className={styles['overlay']} onClick={() => setIsActive(false)}></div>
            <div className={styles['wrapper']}>
              <div
                className={styles['content']}
                onClick={() => {
                  setIsActive(false);
                  setEditModal(true);
                }}
              >
                Edit Task
              </div>
              <div
                onClick={() => {
                  setIsActive(false);
                  setDeleteModal(true);
                }}
                className={styles['content']}
              >
                Delete Task
              </div>
            </div>
          </div>
        )}
      </div>

      {editModal && (
        <EditTaskModal
          challenge={challenge}
          isActive={editModal}
          onClose={() => setEditModal(false)}
        />
      )}

      <PromptModal
        title="Delete Task"
        onClose={() => setDeleteModal(false)}
        visible={deleteModal}
        description="Are you sure you want to delete this task?"
        noButtonText="Cancel"
        yesButtonText="Delete Task"
        yesAction={onDelete}
        noAction={() => setDeleteModal(false)}
        loading={deleting}
      />
    </>
  );
}

export function TaskCardLoader() {
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
