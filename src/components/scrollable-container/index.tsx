import React, { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  children?: ReactNode;
  itemWidth?: number;
}

export function ScrollableContainer ({ children, itemWidth = 400 }:Props) {
  return (
    <div className={styles['scrollable-container']} style={{ minWidth: itemWidth }}>
      {children}
    </div>
  );
};

