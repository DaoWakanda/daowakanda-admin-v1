import { FetchPaginatedDataDto } from './pagination.interface';

export type TriviaDifficulty = 'novice' | 'amateur' | 'pro';

export type TriviaStatus = 'ongoing' | 'expired';

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
