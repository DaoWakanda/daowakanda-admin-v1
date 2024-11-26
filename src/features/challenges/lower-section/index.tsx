'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';
import { IoSearch } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';
import { FiDownloadCloud } from 'react-icons/fi';
import { FilterIcon } from '@/assets/filter.icon';

export function LowerSection() {
  const [search, setSearch] = useState('');

  return (
    <div className={styles['container']}>
      <div className={styles['top-container']}>
        <div className={styles['header']}>
          <div className={styles['title']}>All Challenges</div>
          <div className={styles['download-btn']}>
            Download <FiDownloadCloud className={styles['icon']} />
          </div>
        </div>
        <div className={styles['search-container']}>
          <div className={styles['input-form']}>
            <input
              type="text"
              placeholder="Search"
              required
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
            />
            <IoSearch className={styles['search-icon']} />
          </div>
          <div className={styles['filter']}>
            Filter <FilterIcon />
          </div>
          <div className={styles['toolbar']}>
            <HiDotsVertical className={styles['toolbar-icon']} />
          </div>
        </div>
      </div>
    </div>
  );
}
