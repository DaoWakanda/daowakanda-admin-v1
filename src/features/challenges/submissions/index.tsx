/* eslint-disable react/no-unescaped-entities */

'use client';

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { RiCalendar2Fill } from 'react-icons/ri';
import { GoStopwatch } from 'react-icons/go';
import { useParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { useRecoilValue } from 'recoil';
import toast from 'react-hot-toast';
import { createSanitizedMarkup } from '@/utils/create-sanitized-markup';
import { ITrivia } from '@/interface/challenge.interface';
import { useChallengeActions } from '@/actions';

export function SubmissionsPage() {
 

  return (
    <>
      <div className={styles['main-container']}>
        submissions page
      </div>
    </>
  );
}
