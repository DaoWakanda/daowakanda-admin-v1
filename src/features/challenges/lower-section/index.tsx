'use client';

import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { IoSearch } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';
import { FiDownloadCloud } from 'react-icons/fi';
import { FilterIcon } from '@/assets/filter.icon';
import { useDebounce } from '@/hooks/use-debounce';
import { useChallengeActions } from '@/actions';
import { ITrivia } from '@/interface/challenge.interface';
import { PaginationResponse } from '@/interface/pagination.interface';
import { TableExtension } from '@/components/table/table-extension';
import { Card, CardLoader } from './card';

export function LowerSection() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { getAllChallenges } = useChallengeActions();
  const { debounce } = useDebounce();

  const [challenges, setChallenges] = useState<PaginationResponse<ITrivia>>({
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
  const triviaSize = challenges?.data?.length || 0;
  const fetchData = async (page: number = 1, searchTerm = search) => {
    setLoading(true);

    const response = await getAllChallenges({ page, searchTerm });

    if (response) {
      setChallenges(response);
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

      <div className={styles['cards']}>
        {triviaSize > 0
          ? challenges?.data?.map((trivia, index) => <Card key={index} data={trivia} />)
          : 'No data to display here'}

        {!challenges?.data && Array.from({ length: 5 }).map((_, idx) => <CardLoader key={idx} />)}
      </div>
      <div className="flex flex-col">
        {(loading || challenges?.data?.length > 0) && (
          <TableExtension
            currentPage={challenges?.pagination?.page}
            totalPages={challenges?.pagination?.pageCount}
            goTo={fetchData}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
