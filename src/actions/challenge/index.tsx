'use client';

import { BOUNTY_SMART_CONTRACT_ID } from '@/constants';
import { useClient } from '@/hooks/use-client';
import { FetchPaginatedTrivia, ISubmission, ITrivia } from '@/interface/challenge.interface';
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

  const getChallengeById = async (id: string) => {
    try {
      const url = `trivia/${id}/detail`;
      const response = await client.get(url);
      if (response.data) {
        return response.data as ITrivia;
      }
      toast.error(response.error?.toString() || 'Something went wrong');
    } catch (error) {
      toast.error(error?.toString() || 'Something went wrong');
    }
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

  const getSubmissionById = async (id: string) => {
    try {
      const url = `trivia/submissions-by-trivia/${id}`;
      const response = await client.get(url);
      if (response.data) {
        return response.data as ISubmission[];
      }
      toast.error(response.error?.toString() || 'Something went wrong');
    } catch (error) {
      toast.error(error?.toString() || 'Something went wrong');
    }
  };

  const updateSubmissionStatusById = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const url = `trivia/review-submission/${id}?status=${status}`;
      const response = await client.patch(url);
      if (response.data) {
        return response.data;
      }
      toast.error(response.error?.toString() || 'Something went wrong');
    } catch (error) {
      toast.error(error?.toString() || 'Something went wrong');
    }
  };

  const markSubmissionAsDisbursed = async (id: string) => {
    try {
      const url = `trivia/${id}/disburse/${BOUNTY_SMART_CONTRACT_ID}`;
      const response = await client.patch(url);
      if (response.data) {
        return response.data;
      }
      toast.error(response.error?.toString() || 'Something went wrong');
    } catch (error) {
      toast.error(error?.toString() || 'Something went wrong');
    }
  };

  return {
    getAllChallenges,
    getChallengeById,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    getSubmissionById,
    updateSubmissionStatusById,
    markSubmissionAsDisbursed,
  };
};
