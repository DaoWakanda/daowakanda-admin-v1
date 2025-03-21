import React from "react";
import styles from './index.module.scss';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
interface Props {
  page: number;
  numOfItemsPerPage: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const Pagination = ({
  page = 0,
  numOfItemsPerPage = 0,
  itemCount = 0,
  pageCount = 0,
  hasPreviousPage = false,
  hasNextPage = false,
  onPageChange,
  loading,
}:Props) => {
const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

return (
  <>
    {
      loading? (
        <Skeleton className={styles['container']} 
          highlightColor="#353C52" 
          baseColor="#576183" 
          width={200} 
          height={28} 
        />
      ) : (
        <div className={styles['container']}>
        <div className={styles['btn-container']}>
          <FaArrowLeft className={styles['btn-icon']}/>
          <button
            className={styles['btn-move']}
            onClick={() => hasPreviousPage && onPageChange(page - 1)}
            disabled={!hasPreviousPage}
          >
            Previous
          </button>
        </div>
        
        {pages.map((p) => (
          <button
            key={p}
            className={styles[p === page? 'btn-active': 'btn-btn']}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        
        <div className={styles['btn-container']}>
          <button
            className={styles['btn-move']}
            onClick={() => hasNextPage && onPageChange(page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </button>
          <FaArrowRight className={styles['btn-icon']}/>
        </div>
      </div>
      )
    }
  </>
 
);
};

export default Pagination;