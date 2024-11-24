import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import { IoSearch } from 'react-icons/io5';
import { MdFilterList } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';
import { FiDownloadCloud } from 'react-icons/fi';
import { data } from '../mock';
import { FilterIcon } from '@/assets/filter.icon';
// import { Table } from '@/components/shared';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function LowerSection() {
  return (
    <div className={styles['container']}>
      <div className={styles['top-container']}>
        <div className={styles['header']}>
          <div className={styles['title']}>Top Developers</div>
          <div className={styles['download-btn']}>
            Download <FiDownloadCloud className={styles['icon']} />
          </div>
        </div>
        <div className={styles['search-container']}>
          <div className={styles['input-form']}>
            <input type="text" placeholder="Search" required />
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

      <div className={styles['bottom-container']}>{/* <Table rowData={data} /> */}</div>
    </div>
  );
}
