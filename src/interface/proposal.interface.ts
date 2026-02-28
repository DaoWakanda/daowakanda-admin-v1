export interface IAsset {
  asset_id: number;
  name: string;
  unit_name: string;
  fraction_decimals: number;
  total_supply: number;
  is_deleted: boolean;
  creator_address: string;
  url: string;
  logo: string;
  verification_tier: 'verified';
  usd_value: string | null;
  is_collectible: boolean;
}

export interface IProposal {
  appId: string;
  asaId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  creator: string;
  ongoing: boolean;
  registeredVoters: string[];
  yesVotes: string[];
  noVotes: string[];
}