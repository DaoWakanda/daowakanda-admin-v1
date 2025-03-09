import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';
import Link from 'next/link';
import { IDeveloper } from '@/interface/developer.interface';
import toast from 'react-hot-toast';

export const developersTableHeaders: TableHeaderColumn[] = [
  {
    value: '№',
    style: { width: '60px', color: '#F2F2F7' },
  },
  {
    value: 'Name',
  },
  {
    value: 'Wallet Address',
  },
  {
    value: 'GitHub Link',
  },
  {
    value: 'Location',
  },
  {
    value: 'Earnings',
  },
];

export const developersTableColumn: TableColumn<IDeveloper>[] = [
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
        <div className="flex items-center gap-2">
          <img
            src={
              data.image ||
              `https://ui-avatars.com/api/?name=${
                data.firstName || 'p'
              }&background=ebebeb&size=80&rounded=true&bold=true`
            }
            className="rounded-full w-10 h-10 object-cover aspect-square"
          />
          <div className="flex flex-col gap-[10px]">
            <div className="font-[600]">
              {data.firstName} {data.lastName}
            </div>
            <div className="text-[#959595]">{data.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      const copyToClipboard = () => {
        navigator.clipboard.writeText(data.walletAddress);
        toast.success('Wallet address copied to clipboard');
      };

      return (
        <div
          onClick={copyToClipboard}
          className="line-clamp-1 cursor-pointer"
          title="Click to copy"
        >
          {data.walletAddress.slice(0, 10)}...
          {data.walletAddress.slice(data.walletAddress.length - 10)}
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
          title={data.githubLink}
        >
          {data.githubLink.slice(0, 10)}...
          {data.githubLink.slice(data.githubLink.length - 10)}
        </Link>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-[600]">
          {data.stateOfResidence}, {data.country}
        </div>
      );
    },
  },
  {
    key: '',
    render: (_, data) => {
      return (
        <div className="font-[400] text-[#F2F2F7]">
          {data.awardedAlgos} algo{data.awardedAlgos === 1 ? '' : 's'}
        </div>
      );
    },
  },
];
