/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import styles from './index.module.scss';
import { GoStopwatch } from 'react-icons/go';
import { RiCalendar2Fill } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import { createSanitizedMarkup } from '@/utils/create-sanitized-markup';
import { ITrivia } from '@/interface/challenge.interface';

interface Props {
  data: ITrivia;
}
export function Card({ data }: Props) {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00:00");

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const difference = (data?.endTimeStamp / 1000) - currentTime;

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
  }, [data?.endTimeStamp]);

  return (
    <Link className={styles['card-container']} href={`/dashboard/challenges/${data.id}`}>
      <div className={styles['title']}>{data.skill}</div>
      <div className={styles['inner-section']}>
        <div className={styles['top']}>
          <div className={styles['content']}>
            <div className={styles['title-content']}>{data.title}</div>
            <div className={styles['info']}>
              <div className={styles['date']}>
                <RiCalendar2Fill className={styles['icon']} />
                {new Date(data.createdAt).toDateString()}
              </div>
              <div className={styles['time']}>
                <GoStopwatch className={styles['icon']} />
                {data.status === 'expired' ? 'Ended' : timeLeft}
              </div>
              <div className={styles[data.difficulty]}>{data.difficulty}</div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={createSanitizedMarkup(data.description)}
            className={styles['paragraph']}
          />
        </div>
        <div style={{ flex: 1 }}></div>
        <div className={styles['bottom']}>
          <div className={styles['price']}>
            Prize: <span>{data.prize} Algos</span>{' '}
          </div>
          <div className={styles['dotted']}></div>
          <div className={styles['max']}>Max Winners: {data.maxWinners}</div>
        </div>
      </div>
    </Link>
  );
}

export function CardLoader() {
  return (
    <div className={styles['card-container']}>
      <div className={styles['title']}>
        <Skeleton width={100} />
      </div>
      <div className={styles['inner-section']}>
        <div className={styles['top']}>
          <div className={styles['content']}>
            <div className={styles['title-content']}>
              <Skeleton baseColor="#202020" highlightColor="#444" width={100} />
            </div>
            <div className={styles['info']}>
              <div className={styles['date']}>
                <RiCalendar2Fill className={styles['icon']} />
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#444"
                  width={50}
                />
              </div>
              <div className={styles['time']}>
                <GoStopwatch className={styles['icon']} />
                <Skeleton
                  baseColor="#202020"
                  highlightColor="#444"
                  width={50}
                />
              </div>
              <div className={styles['pro']}>
                {
                  <Skeleton
                    baseColor="#202020"
                    highlightColor="#444"
                    width={50}
                  />
                }
              </div>
            </div>
          </div>
          <div className={styles['paragraph']}>
            {
              <Skeleton
                baseColor="#202020"
                highlightColor="#444"
                count={3}
                width={200}
              />
            }
          </div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['price']}>
            Prize:{' '}
            <span>
              <Skeleton baseColor="#202020" highlightColor="#444" width={20} />
            </span>{' '}
          </div>
          <div className={styles['dotted']}></div>
          <div className={styles['max']}>
            Max Winners:{' '}
            <Skeleton baseColor="#202020" highlightColor="#444" width={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
