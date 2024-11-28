'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { CreateTaskModal } from '../dashboard/create-task-modal';
import { FaPlus } from 'react-icons/fa';
import { TaskCard, TaskCardLoader } from '../dashboard/task-card';
import Link from 'next/link';
import { ITrivia } from '@/interface/challenge.interface';
import { useChallengeActions } from '@/actions/challenge';
import { useRecoilValue } from 'recoil';
import { RefreshChallengesAtom } from '@/state/challenge.atom';
import { LowerSection } from './lower-section';

export function Challenges() {
  const [createModal, setCreateModal] = useState(false);
  const [tasks, setTasks] = useState<ITrivia[]>();
  const { getAllChallenges } = useChallengeActions();
  const refresh = useRecoilValue(RefreshChallengesAtom);

  const fetchChallenges = async () => {
    const response = await getAllChallenges({ order: 'desc', status: 'ongoing' });

    if (response) {
      setTasks(response.data);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [refresh]);

  return (
    <>
      <div className={styles['container']}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-[94px]">
            <div className="text-[#C7C7CC] font-[800] font-avenir text-2xl">Ongoing Challenges</div>
          </div>
          <div className={styles['top-section']}>
            <div className={styles['right']}>
              <div className={styles['create']} onClick={() => setCreateModal(true)}>
                <FaPlus className={styles['icon']} />
              </div>
              <div className={styles['cards']}>
                {tasks?.map((task) => (
                  <TaskCard challenge={task} key={task.id} />
                ))}
                {!tasks &&
                  Array.from({ length: 10 }).map((_, index) => <TaskCardLoader key={index} />)}
              </div>
            </div>
          </div>
        </div>

        <div className={styles['bottom-section']}>
          <LowerSection />
        </div>
      </div>

      {createModal && (
        <CreateTaskModal isActive={createModal} onClose={() => setCreateModal(false)} />
      )}
    </>
  );
}
