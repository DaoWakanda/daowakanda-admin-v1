import { atom } from 'recoil';

export const RefreshChallengesAtom = atom({
  key: 'refresh_challenges',
  default: 0,
});

export const RefreshSubmissionsAtom = atom({
  key: 'refresh_submissions',
  default: 0,
});
