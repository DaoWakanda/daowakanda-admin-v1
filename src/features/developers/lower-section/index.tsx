'use client';

import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { IoSearch } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';
import { FiDownloadCloud } from 'react-icons/fi';
import { FilterIcon } from '@/assets/filter.icon';
import { Table } from '@/components/table';
import { IDeveloper } from '@/interface/developer.interface';
import { developersTableColumn, developersTableHeaders } from './table-info';
import { useDeveloperActions } from '@/actions/developer';
import { useDebounce } from '@/hooks/use-debounce';
import { PaginationResponse } from '@/interface/pagination.interface';

export function LowerSection() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { getAllDevelopers } = useDeveloperActions();
  const { debounce } = useDebounce();

  const [developers, setDevelopers] = useState<PaginationResponse<IDeveloper>>({
    data: [],
    pagination: {
      page: 1,
      numOfItemsPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false,
      itemCount: 0,
      pageCount: 0,
    },
  });

  const fetchData = async (page: number = 1, searchTerm = search) => {
    setLoading(true);

    const response = await getAllDevelopers({ page, searchTerm });

    if (response) {
      setDevelopers(response);
    }

    setLoading(false);
  };

  const debouncedSearch = debounce(() => {
    fetchData(1, search);
  });

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    debouncedSearch();
  }, [search]);

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

      <div className="flex flex-col">
        <Table<IDeveloper>
          headers={developersTableHeaders}
          columns={developersTableColumn}
          data={developers.data}
          loading={loading}
          currentPage={Number(developers.pagination.page)}
          totalPages={Number(developers.pagination.pageCount)}
          goTo={fetchData}
        />
      </div>
    </div>
  );
}
