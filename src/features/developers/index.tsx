'use client';

import React from 'react';
import styles from './index.module.scss';
import { LowerSection } from './lower-section';


export function Developers() {

  return (
    <>
      <div className={styles['container']}>

        <div className={styles['bottom-section']}>
          <LowerSection />
        </div>
      </div>
    </>
  );
}
