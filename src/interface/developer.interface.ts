import { TriviaDifficulty } from './challenge.interface';

export interface IDeveloper {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  country: string;
  stateOfResidence: string;
  githubLink: string;
  walletAddress: string;
  awardedAlgos: number;
}

export interface ICreateChallengeDto {
  title: string;
  duration: number;
  difficulty: TriviaDifficulty;
  prize: number;
  maxWinners: number;
  description: string;
  skill: string;
}
