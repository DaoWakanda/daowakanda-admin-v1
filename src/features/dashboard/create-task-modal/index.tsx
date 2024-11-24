import React, { useState } from 'react';

import styles from './index.module.scss';
import { BackgroundOverlay } from '@/components/background-overlay';

interface Props {
  isActive: boolean;
  onClose: () => any;
}

enum Difficulty {
  AMATEUR = 'Amateur',
  PRO = 'Pro',
  NOVICE = 'Novice',
}

export function CreateTaskModal({ isActive, onClose }: Props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [difficulty, setDifficulty] = useState(Difficulty.NOVICE);
  const [winners, setWinners] = useState(0);
  const [loading, setLoading] = useState(false);

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
          <div className={styles['title']}>Create Task</div>
          <div className={styles['form']}>
            <div className={styles['input']}>
              <label>Title</label>
              <input type="text" placeholder="Enter Task title..." required />
            </div>
            <div className={styles['input-long']}>
              <label>Description</label>
              <textarea placeholder="Enter Task description..."> </textarea>
            </div>
            <div className={styles['skill']}>
              <label>Skill</label>
              <select value={selectedOption} onChange={handleSkillChange}>
                <option value="">Select an option</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
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
            <div className={styles['input-prize']}>
              <label>Prize</label>
              <input type="number" placeholder="00" required />
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
            <div className={styles['input-date']}>
              <label>Start Date</label>
              <input type="date" placeholder="Enter Date" required />
            </div>
          </div>
          <div className={styles['submit']}>{loading ? `Creating Task...` : `Create Task`} </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
