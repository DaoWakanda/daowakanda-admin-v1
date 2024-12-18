'use client';

import { useClient } from '@/hooks/use-client';
import { IDeveloper } from '@/interface/developer.interface';
import { FetchPaginatedDataDto, PaginationResponse } from '@/interface/pagination.interface';
import { IAsset } from '@/interface/proposal.interface';
import { generateQueryFromObject } from '@/utils';
import toast from 'react-hot-toast';

export const useProposalActions = () => {
  const client = useClient();

  const getProposalAssetWhitelist = async () => {
    const url = `/proposal/asset-whitelist`;
    const response = await client.get<string[]>(url);

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const addAssetsToProposalWhitelist = async (assetIds: string[]) => {
    const url = `/proposal/asset-whitelist/many`;
    const response = await client.post<string[]>(url, { assetIds });

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const addAssetToProposalWhitelist = async (assetId: string) => {
    const url = `/proposal/asset-whitelist`;
    const response = await client.post<string[]>(url, { assetId });

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const removeAssetFromProposalWhitelist = async (assetId: string) => {
    const url = `/proposal/asset-whitelist`;
    const response = await client.delete(url, { assetId });

    if (response.data) {
      return response.data;
    }

    toast.error(`${response.error}`);
  };

  const getAssetInformation = async (assetId: string) => {
    const network = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? 'mainnet' : 'testnet';
    const baseUrl = `https://${network.toLowerCase()}.api.perawallet.app/v1/public/assets/${assetId}`;

    const response = await client.get<IAsset>(baseUrl, undefined, {
      overrideDefaultBaseUrl: true,
    });

    if (response.data) {
      return response.data;
    }

    toast.error(`Failed to fetch asset information: ${response.error || 'Asset does not exist'}`);
  };

  return {
    getProposalAssetWhitelist,
    addAssetsToProposalWhitelist,
    addAssetToProposalWhitelist,
    removeAssetFromProposalWhitelist,
    getAssetInformation,
  };
};
