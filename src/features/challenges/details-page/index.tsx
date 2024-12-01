/* eslint-disable react/no-unescaped-entities */

"use client";

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { RiCalendar2Fill } from 'react-icons/ri';
import { GoStopwatch } from 'react-icons/go';
import { useParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { useRecoilValue } from 'recoil';
import toast from 'react-hot-toast';
import { createSanitizedMarkup } from '@/utils/create-sanitized-markup';
import { ITrivia } from '@/interface/challenge.interface';
import { useChallengeActions } from '@/actions';

export function DetailsPage() {
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00:00');
  const [trivia, setTrivia] = useState<ITrivia>();
  const params = useParams();
  
  const [loading, setLoading] = useState(false);

  const { getChallengeById } = useChallengeActions();

  const fetchChallenge = async () => {

    if (!params?.id) return;

    const res = await getChallengeById(params?.id as string);
    setLoading(true);

    if (res) {
      setTrivia(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const difference = Number(trivia?.endTimeStamp) / 1000 - currentTime;

      if (difference > 0) {
        const days = Math.floor(difference / (60 * 60 * 24));
        const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((difference % 3600) / 60);
        const seconds = Math.floor(difference % 60);

        const formattedTime = `${String(days).padStart(2, '0')} days ${String(hours).padStart(2, '0')} hrs ${String(
          minutes,
        ).padStart(2, '0')}mins ${String(seconds).padStart(2, '0')}secs`;
        setTimeLeft(formattedTime);
      } else {
        setTimeLeft('00:00:00');
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [Number(trivia?.endTimeStamp)]);

  return (
    <>
      <div className={styles['main-container']}>
        <Link className={styles['header']} href={'/dashboard/challenges'}>
          <div className={styles['task']}>Tasks</div>
          <IoIosArrowForward className={styles['arr']} />
          <div className={styles['title']}>
            {trivia?.title || (
              <Skeleton baseColor="#202020" highlightColor="#444" width={100} />
            )}
          </div>
        </Link>
        <div className={styles['inner-container']}>
        
            <div className={styles['normal']}>
              <div className={styles['top-section']}>
                <div className={styles['lead']}>
                  {trivia?.title || (
                    <Skeleton
                      baseColor="#202020"
                      highlightColor="#444"
                      width={150}
                    />
                  )}
                </div>
                <div className={styles['content']}>
                  <div className={styles['info']}>
                    <div className={styles['date']}>
                      <RiCalendar2Fill className={styles['icon']} />
                      {trivia ? (
                        new Date(trivia.createdAt).toDateString()
                      ) : (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={50}
                        />
                      )}
                    </div>
                    <div className={styles['time']}>
                      <GoStopwatch className={styles['icon']} />
                      {loading ? (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={50}
                        />
                      ) : trivia?.status === 'expired' ? (
                        'Ended'
                      ) : (
                        timeLeft
                      )}
                    </div>
                    <div className={styles[trivia?.difficulty || 'status']}>
                      {trivia?.difficulty || (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={50}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles['bottom']}>
                    <div className={styles['price']}>
                      Prize:{' '}
                      <span>
                        {trivia ? (
                          `${trivia.prize} algos`
                        ) : (
                          <Skeleton
                            baseColor="#202020"
                            highlightColor="#444"
                            width={100}
                          />
                        )}
                      </span>{' '}
                    </div>
                    <div className={styles['dotted']}></div>
                    <div className={styles['max']}>
                      Max Winners:{' '}
                      {trivia?.maxWinners || (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={100}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles['bottom-section']}>
                {trivia?.description ? (
                  <div
                    dangerouslySetInnerHTML={createSanitizedMarkup(
                      trivia.description,
                    )}
                    className={styles['text']}
                  ></div>
                ) : (
                  <div className={styles['text']}>
                    <Skeleton
                      count={5}
                      baseColor="#202020"
                      highlightColor="#444"
                      width={'100%'}
                    />
                  </div>
                )}
              </div>
            </div>
          
        </div>
        <Link className={styles['lower-btn']} href={`/dashboard/challenges/${params?.id}/submissions`}>View Submissions</Link>
      </div>
    </>
  );
}
