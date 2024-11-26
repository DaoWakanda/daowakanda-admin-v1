'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { CreateTaskModal } from './create-task-modal';
import { EditTaskModal } from './edit-task-modal';
import { FaPlus } from 'react-icons/fa';
import { TaskCard, TaskCardLoader } from './task-card';
import { LowerSection } from './lower-section';
import Link from 'next/link';
import { ITrivia } from '@/interface/challenge.interface';
import { useChallengeActions } from '@/actions/challenge';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function Dashboard() {
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [tasks, setTasks] = useState<ITrivia[]>();
  const { getAllChallenges } = useChallengeActions();

  const fetchChallenges = async () => {
    const response = await getAllChallenges({ order: 'desc' });

    if (response) {
      setTasks(response.data);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <>
      <div className={styles['container']}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-end items-center gap-[94px]">
            <div className="text-[#C7C7CC] font-[800] font-avenir text-2xl">
              Recently created challenges
            </div>
            <Link
              className="font-poppins text-[#C7C7CC] text-sm font-[400]"
              href="/dashboard/challenges"
            >
              view all
            </Link>
          </div>
          <div className={styles['top-section']}>
            <div className={styles['left']}>
              <div className={styles['title']}>Manage all challenges</div>
              <div className={styles['body-text']}>
                You’re now able to manage task. This includes creating new tasks, editing and
                deleting previous tasks
              </div>
            </div>
            <div className={styles['right']}>
              <div className={styles['create']} onClick={() => setCreateModal(true)}>
                <FaPlus className={styles['icon']} />
              </div>
              <div className={styles['cards']}>
                {tasks?.map((task, index) => (
                  <TaskCard challenge={task} key={index} />
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

      <CreateTaskModal isActive={createModal} onClose={() => setCreateModal(false)} />
    </>
  );
}
