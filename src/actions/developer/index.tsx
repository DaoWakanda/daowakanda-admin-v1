'use client';

import { useClient } from '@/hooks/use-client';
import { IDeveloper } from '@/interface/developer.interface';
import { FetchPaginatedDataDto, PaginationResponse } from '@/interface/pagination.interface';
import { generateQueryFromObject } from '@/utils';
import toast from 'react-hot-toast';

export const useDeveloperActions = () => {
  const client = useClient();

  const getAllDevelopers = async (dto: FetchPaginatedDataDto) => {
    const query = generateQueryFromObject(dto);
    const url = `/developer/all?${query}`;

    const response = await client.get(url);

    if (response.data) {
      return {
        ...response.data,
        pagination: response.data.pagination || response.data.pageMetaDto,
      } as PaginationResponse<IDeveloper>;
    }

    toast.error(`${response.error}`);
  };

  return {
    getAllDevelopers,
  };
};
