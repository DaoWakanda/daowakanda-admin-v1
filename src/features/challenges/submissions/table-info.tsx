import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ISubmission } from '@/interface/challenge.interface';
import { formatDate } from '@/utils';

export const submissionTableHeaders: TableHeaderColumn[] = [
  {
    value: '№',
    style: { width: '60px', color: '#F2F2F7' },
  },
  {
    value: 'Developer Name',
  },
  {
    value: 'GitHub Link',
  },
  {
    value: 'Submission Status',
  },
  {
    value: 'Disbursement Status',
  },
  {
    value: 'Created Date',
  },
];

export const submissionTableColumn: TableColumn<ISubmission>[] = [
  {
    key: '',
    render: (_, __, index) => {
      return <div>{String(index! + 1).padStart(3, '0')}</div>;
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-[600]">
          {data.developer}
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <Link
          target="_blank"
          href={'https://' + data.githubLink.replaceAll('https://', '')}
          className="text-[#007AFF] line-clamp-1"
        >
          {data.githubLink}
        </Link>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-[600]">
          {data.submissionStatus}
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-[600]">
          {data.disbursementStatus}
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-[600]">
          {formatDate(data.createdAt)}
        </div>
      );
    },
  },
];
