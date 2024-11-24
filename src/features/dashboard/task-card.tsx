import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { HiDotsVertical } from 'react-icons/hi';
import { StopWatchIcon } from '@/assets/stop-watch.icon';
import { ChallengeDifficultyIndicator } from '@/components/challenge-difficulty-indicator';
import { calculateCountdown } from '@/utils/calculate-countdown';

interface Props {
  showEditModal?: any;
}

interface TaskModalProps {
  onClose?: any;
  showEditModal?: any;
}

export function TaskCard({ showEditModal }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState('00:00:00');

  const handleCloseTaskModal = () => {
    setIsActive(false);
  };

  const endTime = 1733683492418;

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(() => {
        return calculateCountdown(endTime);
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
          UI/UX Design Engineering
        </div>
        <div className="text-[#fff] font-[700] font-poppins text-2xl line-clamp-2">
          Build a Wallet
        </div>
        <div className="flex flex-row items-center justify-between gap-1 mt-1">
          <div>
            <StopWatchIcon />
          </div>
          <div className="text-[#8E8E93] font-[600] text-sm font-roboto">{countdown}</div>
          <ChallengeDifficultyIndicator difficulty="novice" />
        </div>

        {isActive && <TaskModal onClose={handleCloseTaskModal} showEditModal={showEditModal} />}
      </div>
    </>
  );
}

function TaskModal({ onClose, showEditModal }: TaskModalProps) {
  return (
    <div className={styles['edit-card-modal']}>
      <div className={styles['overlay']} onClick={onClose}></div>
      <div className={styles['wrapper']}>
        <div className={styles['content']} onClick={showEditModal}>
          Edit Task
        </div>
        <div className={styles['content']}>Delete Task</div>
      </div>
    </div>
  );
}
