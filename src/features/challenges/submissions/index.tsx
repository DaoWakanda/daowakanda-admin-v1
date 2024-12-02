'use client';

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { ISubmission } from '@/interface/challenge.interface';
import { useChallengeActions } from '@/actions';
import { submissionTableColumn, submissionTableHeaders } from './table-info';
import { Table } from '@/components/table';
import { BsBoxArrowInLeft } from 'react-icons/bs';

export function SubmissionsPage() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { getSubmissionById } = useChallengeActions();

  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  const fetchData = async () => {
    if (!params?.id) return;

    const response = await getSubmissionById(params?.id as string);
    setLoading(true);

    if (response) {
      setSubmissions(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBackRoute = () => {
    router.back();
  };

  return (
    <>
      <div className={styles['container']}>
        <div>
          <BsBoxArrowInLeft color="#FFF" onClick={handleBackRoute} className={styles['icon']} />
        </div>
        <div className="flex flex-col">
          <Table<ISubmission>
            headers={submissionTableHeaders}
            columns={submissionTableColumn}
            data={submissions}
            loading={loading}
            currentPage={Number(1)}
            totalPages={Number(0)}
            goTo={fetchData}
          />
        </div>
      </div>
    </>
  );
}
