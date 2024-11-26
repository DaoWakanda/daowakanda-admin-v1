import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { BackgroundOverlay } from '@/components/background-overlay';
import { useSetRecoilState } from 'recoil';
import { RefreshChallengesAtom } from '@/state/challenge.atom';
import { ICreateChallengeDto } from '@/interface/developer.interface';
import { RichTextInput } from '@/components/rich-text-input';
import classNames from 'classnames';
import { Spinner } from '@/components/spinner';
import { useChallengeActions } from '@/actions/challenge';
import toast from 'react-hot-toast';

interface Props {
  isActive: boolean;
  onClose: () => void;
}

enum Difficulty {
  AMATEUR = 'amateur',
  PRO = 'pro',
  NOVICE = 'novice',
}

export function CreateTaskModal({ isActive, onClose }: Props) {
  const [data, setData] = useState<ICreateChallengeDto>({
    title: '',
    description: '',
    difficulty: Difficulty.NOVICE,
    duration: 0,
    prize: 0,
    skill: '',
    maxWinners: 0,
  });
  const { createChallenge } = useChallengeActions();
  const [duration, setDuration] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(false);
  const setRefresh = useSetRecoilState(RefreshChallengesAtom);

  const onChange = (key: keyof ICreateChallengeDto, value: string | number) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = Object.keys(data).every((key) => !!(data as any)[key]);

  const onSubmit = async () => {
    if (!canSubmit || loading) return;

    setLoading(true);
    const response = await createChallenge(data);
    setLoading(false);

    if (response) {
      toast.success('Challenge created successfully');
      setRefresh((old) => old + 1);
      onClose();
    }
  };

  useEffect(() => {
    const totalDurationInSeconds =
      duration.days * 24 * 60 * 60 +
      duration.hours * 60 * 60 +
      duration.minutes * 60 +
      duration.seconds;
    onChange('duration', totalDurationInSeconds);
  }, [duration]);

  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onClose}>
        <div className={styles['card']}>
          <div className={styles['title']}>Create Task</div>
          <div className={'flex flex-col gap-4 w-full'}>
            <div className={'flex flex-col gap-1'}>
              <label className="font-roboto text-sm font-[400] text-[#919094]">Title</label>
              <input
                className={classNames(
                  'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none',
                  'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                )}
                type="text"
                placeholder={'Enter Task title...'}
                required
                value={data.title}
                onChange={(evt) => onChange('title', evt.target.value)}
              />
            </div>
            <div className={'flex flex-col gap-1'}>
              <label className="font-roboto text-sm font-[400] text-[#919094]">Description</label>
              <RichTextInput
                name="description"
                initialValue={''}
                onChange={(value) => onChange('description', value.target.value)}
                placeholder={'Enter Task description'}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className={'flex flex-col gap-1 flex-1'}>
                <label className="font-roboto text-sm font-[400] text-[#919094]">Skill</label>
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="text"
                  placeholder={'Enter Task skill...'}
                  required
                  value={data.skill}
                  onChange={(evt) => onChange('skill', evt.target.value)}
                />
              </div>
              <div className={styles['difficulty']}>
                <label>Difficulty</label>
                <select
                  value={data.difficulty}
                  onChange={(evt) => onChange('difficulty', evt.target.value)}
                >
                  <option value={Difficulty.NOVICE}>{Difficulty.NOVICE}</option>
                  <option value={Difficulty.AMATEUR}>{Difficulty.AMATEUR}</option>
                  <option value={Difficulty.PRO}>{Difficulty.PRO}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className={'flex flex-col gap-1 flex-1'}>
                <label className="font-roboto text-sm font-[400] text-[#919094]">
                  Prize in algos
                </label>
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="number"
                  placeholder={String(data.prize) || 'Prize...'}
                  required
                  value={data.prize}
                  onChange={(evt) => onChange('prize', Number(evt.target.value))}
                />
              </div>
              <div className={styles['input-winners']}>
                <label>Number of Winners</label>
                <div className={styles['inner']}>
                  <button
                    className={styles['add-btn']}
                    disabled={!data.maxWinners}
                    onClick={() => onChange('maxWinners', Number(data.maxWinners) - 1)}
                  >
                    -
                  </button>
                  <div className={styles['winners']}>{data.maxWinners}</div>
                  <button
                    className={styles['minus-btn']}
                    onClick={() => onChange('maxWinners', Number(data.maxWinners || '0') + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={'flex flex-col gap-1 flex-1'}>
              <label className="font-roboto text-sm font-[400] text-[#919094]">
                Duration (Days: hours: minutes: seconds)
              </label>

              <div className="flex flex-row items-center gap-2">
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none w-[50px] text-center',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="number"
                  placeholder={'00'}
                  required
                  value={String(duration.days).padStart(2, '0')}
                  onChange={(evt) =>
                    setDuration((old) => ({
                      ...old,
                      days: Number(evt.target.value),
                    }))
                  }
                />
                <p className="text-[#919094] text-3xl font-[400] font-roboto">:</p>
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none w-[50px] text-center',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="text"
                  placeholder={'00'}
                  required
                  value={String(duration.hours).padStart(2, '0')}
                  onChange={(evt) =>
                    setDuration((old) => ({
                      ...old,
                      hours: Number(evt.target.value),
                    }))
                  }
                />
                <p className="text-[#919094] text-3xl font-[400] font-roboto">:</p>
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none w-[50px] text-center',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="text"
                  placeholder={'00'}
                  required
                  value={String(duration.minutes).padStart(2, '0')}
                  onChange={(evt) =>
                    setDuration((old) => ({
                      ...old,
                      minutes: Number(evt.target.value),
                    }))
                  }
                />
                <p className="text-[#919094] text-3xl font-[400] font-roboto">:</p>
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none w-[50px] text-center',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="text"
                  placeholder={'00'}
                  required
                  value={String(duration.seconds).padStart(2, '0')}
                  onChange={(evt) =>
                    setDuration((old) => ({
                      ...old,
                      seconds: Number(evt.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div
            className={classNames(
              styles['submit'],
              !canSubmit || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={onSubmit}
          >
            {loading ? <Spinner color="#002201" /> : `Create Task`}{' '}
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
