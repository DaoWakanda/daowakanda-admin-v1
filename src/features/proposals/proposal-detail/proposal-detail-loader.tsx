'use client';

import styles from './index.module.scss';
import Skeleton from 'react-loading-skeleton';

export const ProposalDetailLoader = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['top-container']}>
        <div className={styles['header']}>
          <Skeleton highlightColor="#353C52" baseColor="#576183" width={200} height={28} />
        </div>
        <div className={styles['description']}>
          <Skeleton highlightColor="#353C52" baseColor="#576183" width={900} count={2} />
        </div>
      </div>
      <div className={styles['bottom-container']}>
        {
          [1,2,3].map((_, index)=>(
        <div className={styles['card-results']} key={index}>
          <div className={styles['header']}>
            <div className={styles['heading']}>
            <Skeleton highlightColor="#353C52" baseColor="#576183" width={200} height={28} />
            </div>
            <div className={styles['votes']}><Skeleton highlightColor="#353C52" baseColor="#576183" width={100} height={28} /></div>
          </div>
        
          <div className={styles['reports']}>
            <div className={styles['report-line']}>    
              <Skeleton highlightColor="#353C52" baseColor="#576183" width={320} height={20} />
            </div>
            <div className={styles['report-line']}>    
              <Skeleton highlightColor="#353C52" baseColor="#576183" width={320} height={20} />
            </div>
            <div className={styles['report-line']}>    
              <Skeleton highlightColor="#353C52" baseColor="#576183" width={320} height={20} />
            </div>
          </div>
        </div>
          ))
        }
        
      </div>
    </div>
  );
};
