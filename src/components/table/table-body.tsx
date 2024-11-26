import Skeleton from 'react-loading-skeleton';
import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';
import classNames from 'classnames';

interface TableBodyProps<T = any> {
  columns: TableColumn<T>[];
  data: any[];
  rowClickHandler?: (rowData: T) => void;
  headers: string[] | TableHeaderColumn[];
  loading?: boolean;
}

export function TableBody<T = any>({
  columns,
  data,
  rowClickHandler = () => null,
  headers,
  loading,
}: TableBodyProps<T>) {
  return (
    <tbody>
      {!loading &&
        data.map((row, rowIndex) => (
          <tr
            className={'border-b-[1px] border-b-[#E4E4E4] h-[58px]'}
            key={rowIndex}
            onClick={() => rowClickHandler(row)}
          >
            {columns.map((column, index) => (
              <td
                key={index}
                className={classNames(
                  'px-5 py-5 text-[#F2F2F7] font-inter font-[400] text-sm',
                  column.className,
                )}
                data-label={headers[index]}
                style={{ ...column.style }}
              >
                {column.render(row[column.key], row, rowIndex)}
              </td>
            ))}
          </tr>
        ))}
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <tr className={'border-b-[1px] border-b-[#E4E4E4] h-[58px]'} key={index}>
            {columns.map((column, index) => (
              <td
                key={index}
                className="px-5 py-5 text-[#F2F2F7] font-inter font-[400] text-sm"
                data-label={headers[index]}
                style={{ ...column.style }}
              >
                <Skeleton highlightColor="#353C52" baseColor="#576183" />
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
}
