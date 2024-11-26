import { TableHeaderColumn } from '@/interface/table.interface';
import classNames from 'classnames';

interface TableHeaderProps {
  headers: string[] | TableHeaderColumn[];
}

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr className={classNames('h-[58px] bg-[#353C52] border-b-[1px] border-b-[#E4E4E4]')}>
        {headers.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <td className={'p-5 font-inter font-[600] text-sm text-[#AEAEB2]'} key={index}>
                {item}
              </td>
            );
          } else {
            return (
              <td
                className={classNames(
                  'p-5 font-inter font-[600] text-sm text-[#AEAEB2]',
                  item.className,
                )}
                key={index}
                style={{ ...item.style }}
              >
                {item.value}
              </td>
            );
          }
        })}
      </tr>
    </thead>
  );
}
