import styles from './index.module.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface TableExtensionProps {
  currentPage: number;
  totalPages: number;
  goTo: (page: number) => void;
  loading?: boolean;
}

export const TableExtension = ({ currentPage, totalPages, goTo, loading }: TableExtensionProps) => {
  const renderPageNumbers = () => {
    const pageDivs: ReactNode[] = [];
    const numAhead = totalPages - currentPage + 1;
    const numBehind = totalPages - numAhead;

    if (numAhead < 6 && numBehind > 0) {
      const offset = 6 - numAhead;
      const firstIndexOffset = offset > numBehind ? numBehind : offset;
      const firstIndex = currentPage - firstIndexOffset;

      for (let i = firstIndex; i <= totalPages; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i === currentPage}
            key={i}
            value={i}
            onSelect={() => goTo(i)}
            loading={loading}
          />,
        );
      }
    } else if (numAhead <= 6) {
      for (let i = currentPage; i <= totalPages; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i === currentPage}
            key={i}
            value={i}
            onSelect={() => goTo(i)}
            loading={loading}
          />,
        );
      }
    } else {
      for (let i = 0; i < 3; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i + currentPage === currentPage}
            key={i}
            value={i + currentPage}
            onSelect={() => goTo(i + currentPage)}
            loading={loading}
          />,
        );
      }

      pageDivs.push(
        <PageDiv
          isCurrentPage={false}
          key={3}
          value={'...'}
          onSelect={() => goTo(currentPage + 3)}
          loading={loading}
        />,
      );

      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageDivs.push(
          <PageDiv
            isCurrentPage={i === currentPage}
            key={i}
            value={i}
            onSelect={() => goTo(i)}
            loading={loading}
          />,
        );
      }
    }

    return pageDivs;
  };

  return (
    <div className={'flex flex-row items-center justify-center gap-2 p-4'}>
      <div className={'flex flex-row items-center gap-3'}>{renderPageNumbers()}</div>
    </div>
  );
};

interface PageDivProps {
  isCurrentPage: boolean;
  onSelect: () => any;
  value: number | string;
  loading?: boolean;
}

const PageDiv = ({ isCurrentPage, onSelect, value, loading }: PageDivProps) => {
  return (
    <div
      className={classNames(
        'py-2 px-[9px] rounded-[6px] min-w-[34px] min-h-8 font-inter font-[400] text-sm text-[#8E8E93] cursor-pointer flex items-center justify-center',
        !loading && 'hover:bg-[#F9FAFC] hover:text-[#8E8E93]',
        isCurrentPage ? 'bg-[#F9FAFC] text-[#8E8E93]' : '',
        loading ? 'opacity-50 cursor-progress' : '',
      )}
      onClick={() => {
        if (!isCurrentPage && !loading) {
          onSelect();
        }
      }}
    >
      {String(value).padStart(2, '0')}
    </div>
  );
};
