'use client';

import { AssetWhitelist } from './asset-whitelist';
import styles from './index.module.scss';

export const Proposals = () => {
  return (
    <div className={styles.container}>
      <AssetWhitelist />
    </div>
  );
};
