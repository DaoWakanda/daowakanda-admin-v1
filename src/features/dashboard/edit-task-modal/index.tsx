import React, { useState } from 'react';
import styles from './index.module.scss';
import { BackgroundOverlay } from '@/components/background-overlay';
import { ITrivia } from '@/interface/challenge.interface';
import { useSetRecoilState } from 'recoil';
import { RefreshChallengesAtom } from '@/state/challenge.atom';
import { ICreateChallengeDto } from '@/interface/developer.interface';
import { RichTextInput } from '@/components/rich-text-input';
import classNames from 'classnames';

interface Props {
  isActive: boolean;
  challenge: ITrivia;
  onClose: () => void;
}

enum Difficulty {
  AMATEUR = 'Amateur',
  PRO = 'Pro',
  NOVICE = 'Novice',
}

export function EditTaskModal({ isActive, onClose, challenge }: Props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState<Partial<ICreateChallengeDto>>({ ...challenge });
  const [difficulty, setDifficulty] = useState(Difficulty.NOVICE);
  const [winners, setWinners] = useState(0);
  const [loading, setLoading] = useState(false);
  const setRefresh = useSetRecoilState(RefreshChallengesAtom);

  const handleSkillChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleDifficultyChange = (event: any) => {
    setDifficulty(event.target.value);
  };

  const handleAddWinners = () => {
    setWinners(winners + 1);
  };

  const handleSubtractWinners = () => {
    setWinners(winners - 1);
  };

  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onClose}>
        <div className={styles['card']}>
          <div className={styles['title']}>Edit Task</div>
          <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-col gap-1'}>
              <label className="font-roboto text-sm font-[400] text-[#919094]">Title</label>
              <input
                className={classNames(
                  'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none',
                  'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                )}
                type="text"
                placeholder={challenge.title || 'Enter Task title...'}
                required
                value={data.title}
              />
            </div>
            <div className={'flex flex-col gap-1'}>
              <label className="font-roboto text-sm font-[400] text-[#919094]">Description</label>
              <RichTextInput
                name="description"
                initialValue={challenge.description || 'Enter Task description'}
                onChange={(value) => setData({ ...data, description: value.target.value })}
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
                  placeholder={challenge.skill || 'Enter Task skill...'}
                  required
                  value={data.skill}
                />
              </div>
              <div className={styles['difficulty']}>
                <label>Difficulty</label>
                <select value={difficulty} onChange={handleDifficultyChange}>
                  <option value="">Select an option</option>
                  <option value={Difficulty.NOVICE}>{Difficulty.NOVICE}</option>
                  <option value={Difficulty.AMATEUR}>{Difficulty.AMATEUR}</option>
                  <option value={Difficulty.PRO}>{Difficulty.PRO}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className={'flex flex-col gap-1 flex-1'}>
                <label className="font-roboto text-sm font-[400] text-[#919094]">Skill</label>
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="text"
                  placeholder={challenge.skill || 'Enter Task skill...'}
                  required
                  value={data.skill}
                />
              </div>
              <div className={styles['input-winners']}>
                <label>Number of Winners</label>
                <div className={styles['inner']}>
                  <button
                    className={styles['add-btn']}
                    disabled={winners == 0}
                    onClick={handleSubtractWinners}
                  >
                    -
                  </button>
                  <div className={styles['winners']}>{winners}</div>
                  <button className={styles['minus-btn']} onClick={handleAddWinners}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className={'flex flex-col gap-1 flex-1'}>
              <label className="font-roboto text-sm font-[400] text-[#919094]">
                Duration (Days/hours/minutes/seconds)
              </label>

              <div className="flex flex-row items-center gap-2">
                <input
                  className={classNames(
                    'bg-[#2F3033] py-[10px] px-4 rounded-lg outline-none w-[50px] text-center',
                    'font-roboto text-sm font-[400] text-[#919094] min-h-[50px]',
                  )}
                  type="text"
                  placeholder={'00'}
                  required
                  value={'00'}
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
                  value={'00'}
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
                  value={'00'}
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
                  value={'00'}
                />
              </div>
            </div>
          </div>
          <div className={styles['submit']}>{loading ? `Editing Task...` : `Edit Task`} </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
