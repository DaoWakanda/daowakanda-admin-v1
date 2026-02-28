'use client';

import { AssetWhitelist } from './asset-whitelist';
import styles from './index.module.scss';
import { ProposalCards } from './proposal-cards';

export const Proposals = () => {
  return (
    <div className={styles.container}>
      <AssetWhitelist />
      <ProposalCards />
    </div>
  );
};
