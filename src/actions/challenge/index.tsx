'use client';

import { useClient } from '@/hooks/use-client';
import { FetchPaginatedTrivia, ITrivia } from '@/interface/challenge.interface';
import { ICreateChallengeDto } from '@/interface/developer.interface';
import { PaginationResponse } from '@/interface/pagination.interface';
import { generateQueryFromObject } from '@/utils';
import toast from 'react-hot-toast';

export const useChallengeActions = () => {
  const client = useClient();

  const getAllChallenges = async (dto: FetchPaginatedTrivia) => {
    const query = generateQueryFromObject(dto);
    const url = `/trivia/all?${query}`;

    const response = await client.get<PaginationResponse<ITrivia>>(url);

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const createChallenge = async (dto: ICreateChallengeDto) => {
    const url = `/trivia/create`;

    const response = await client.post(url, dto);

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const updateChallenge = async (id: string, dto: Partial<ICreateChallengeDto>) => {
    const url = `/trivia/${id}/update`;

    const response = await client.patch(url, dto);

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const deleteChallenge = async (id: string) => {
    const url = `/trivia/${id}/delete`;

    const response = await client.delete(url);

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  return {
    getAllChallenges,
    createChallenge,
    updateChallenge,
    deleteChallenge,
  };
};
