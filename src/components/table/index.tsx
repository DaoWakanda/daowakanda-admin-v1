import { EmptyState } from './empty-state';
import { TableBody } from './table-body';
import { TableExtension } from './table-extension';
import { TableHeader } from './table-header';
import { TableColumn, TableHeaderColumn } from '@/interface/table.interface';

interface TableProps<T> {
  headers: string[] | TableHeaderColumn[];
  columns: TableColumn<T>[];
  data: T[];
  rowClickHandler?: (rowData: T) => void;
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  goTo: (page: number) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

export function Table<T = any>({
  headers,
  columns,
  data,
  rowClickHandler,
  loading,
  currentPage,
  totalPages,
  goTo,
  emptyStateDescription,
  emptyStateTitle,
}: TableProps<T>) {
  return (
    <div className="flex flex-col gap-[18px]">
      <main className="flex flex-col border-[1px] rounded-[12px] border-[#E4E4E4] overflow-hidden">
        {data.length === 0 && !loading ? (
          <EmptyState title={emptyStateTitle} description={emptyStateDescription} />
        ) : (
          <table>
            <TableHeader headers={headers} />
            <TableBody<T>
              headers={headers}
              columns={columns}
              data={data}
              rowClickHandler={rowClickHandler}
              loading={loading}
            />
          </table>
        )}
      </main>

      {(loading || data.length > 0) && (
        <TableExtension
          currentPage={currentPage}
          totalPages={totalPages}
          goTo={goTo}
          loading={loading}
        />
      )}
    </div>
  );
}
