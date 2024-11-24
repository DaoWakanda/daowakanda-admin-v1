import { TriviaDifficulty } from '@/interface/challenge.interface';
import classNames from 'classnames';

export interface Props {
  difficulty: TriviaDifficulty;
}

export const ChallengeDifficultyIndicator = ({ difficulty }: Props) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-center py-[2px] px-2 font-[600] capitalize',
        'rounded-lg bg-[#ffcc0033] text-[#ffcc00] text-sm',
        difficulty === 'novice' ? 'bg-[#34c75933] text-[#34c759]' : '',
        difficulty === 'pro' ? 'bg-[#ff3b3033] text-[#ff3b30]' : '',
      )}
    >
      {difficulty}
    </div>
  );
};
