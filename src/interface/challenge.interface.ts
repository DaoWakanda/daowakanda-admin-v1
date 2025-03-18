import { FetchPaginatedDataDto } from './pagination.interface';

export type TriviaDifficulty = 'novice' | 'amateur' | 'pro';

export type TriviaStatus = 'ongoing' | 'expired';

export type SubmissionStatus = 'approved' | 'pending' | 'rejected';

export type DisbursementStatus =
  | 'disbursed'
  | 'not_disbursed'
  | 'pending'
  | 'not_eligible'
  | 'eligible';

export interface ITrivia {
  id: string;
  title: string;
  duration: number;
  difficulty: TriviaDifficulty;
  prize: number;
  maxWinners: number;
  winnersCount: number;
  description: string;
  skill: string;
  createdAt: string;
  status: TriviaStatus;
  endTimeStamp: number;
}

export interface FetchPaginatedTrivia extends FetchPaginatedDataDto {
  status?: TriviaStatus;
}

export interface ISubmission {
  id: string;
  githubLink: string;
  title: string;
  submissionStatus: SubmissionStatus;
  disbursementStatus: DisbursementStatus;
  developer: string;
  createdAt: string;
  walletAddress: string;
  bounty: number;
}
