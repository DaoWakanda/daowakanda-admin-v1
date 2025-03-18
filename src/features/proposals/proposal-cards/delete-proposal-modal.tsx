'use client';

import { BackgroundOverlay } from '@/components/background-overlay';
import { Spinner } from '@/components/spinner';
import styles from './index.module.scss';


interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  yesButtonText: string;
  noButtonText?: string;
  yesAction: () => void;
  noAction?: () => void;
  loading?: boolean;
}

export const DeleteProposalModal = ({
  visible,
  onClose,
  title,
  description,
  yesButtonText,
  noButtonText = 'Cancel',
  loading = false,
  noAction,
  yesAction,
 }: Props) => {
 

  return (
    <BackgroundOverlay visible={visible} onClose={onClose}>
      <div
        className={styles['delete-card-container']}
      >
        <div className={styles['header-text']}>{title}</div>

        <div className={styles['sub-text']}>
         {description}
        </div>

        <div className={styles['button-group']}>
          <div
            className={styles['button']}
            onClick= { noAction }
          >
            {noButtonText}
          </div>
          <div
            className={styles['button-cancel']}
            onClick={yesAction}
          >
            {loading ? <Spinner color="#002201" /> : yesButtonText}{' '}
          </div>
        </div>
       
      </div>
    </BackgroundOverlay>
  );
};
