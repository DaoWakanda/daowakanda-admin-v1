'use client';

import { FaPlus } from 'react-icons/fa';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useProposalActions } from '@/actions/proposal';
import { AssetCard, AssetCardLoader } from './asset-card';
import { AddAssetModal } from './add-asset-modal';

export const AssetWhitelist = () => {
  const [createModal, setCreateModal] = useState(false);
  const [assets, setAssets] = useState<string[]>();
  const { getProposalAssetWhitelist } = useProposalActions();

  const fetchWhitelist = async () => {
    const response = await getProposalAssetWhitelist();

    if (response) {
      setAssets(response);
    }
  };

  useEffect(() => {
    fetchWhitelist();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-[94px]">
        <div className="text-[#C7C7CC] font-[800] font-avenir text-2xl">ASA Whitelist</div>
      </div>
      <div className={styles['top-section']}>
        <div className={styles['right']}>
          <div className={styles['create']} onClick={() => setCreateModal(true)}>
            <FaPlus className={styles['icon']} />
          </div>
          <div className={styles['cards']}>
            {assets?.map((asset) => (
              <AssetCard asaId={asset} refresh={fetchWhitelist} key={asset} />
            ))}
            {!assets &&
              Array.from({ length: 10 }).map((_, index) => <AssetCardLoader key={index} />)}
          </div>
        </div>
      </div>

      {createModal && (
        <AddAssetModal onClose={() => setCreateModal(false)} refresh={fetchWhitelist} />
      )}
    </div>
  );
};
