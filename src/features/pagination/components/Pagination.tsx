import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import usePagination from '../hooks/usePagination';
import { PaginationLink } from './PaginationLink';

interface PaginationProps {
  currentPage: number;
  siblingDelta?: number;
  totalResults: number;
  itemsPerPage: number;
}

export function Pagination({
  currentPage,
  totalResults,
  itemsPerPage,
  siblingDelta = 1,
}: PaginationProps) {
  const totalPageCount = Math.ceil(totalResults / itemsPerPage);
  const pageNumbers = usePagination(currentPage, totalPageCount, siblingDelta);

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex flex-wrap items-center justify-center gap-2 rounded-sm py-6">
      {currentPage > 1 && (
        <PaginationLink
          currentPage={currentPage}
          page={currentPage - 1}
          aria-label="Previous page"
          label={<FiChevronLeft />}
        />
      )}
      <PaginationLink currentPage={currentPage} page={1} aria-label="Page 1" label="1" />
      {currentPage >= siblingDelta + 4 && (
        <PaginationLink
          currentPage={currentPage}
          page={currentPage - siblingDelta - 1}
          aria-label={`Page ${currentPage - siblingDelta - 1}`}
          label="..."
        />
      )}
      {pageNumbers.map((pageNumber, index) => (
        <PaginationLink
          currentPage={currentPage}
          key={pageNumber.toString() + index}
          page={pageNumber}
          aria-label={`Page ${pageNumber}`}
          label={pageNumber}
        />
      ))}
      {currentPage <= totalPageCount - 3 - siblingDelta && (
        <PaginationLink
          currentPage={currentPage}
          aria-label={`Page ${currentPage + siblingDelta + 1}`}
          page={currentPage + siblingDelta + 1}
          label="..."
        />
      )}
      <PaginationLink
        currentPage={currentPage}
        aria-label={`Page ${totalPageCount}`}
        page={totalPageCount}
        label={totalPageCount}
      />
      {currentPage < totalPageCount && (
        <PaginationLink
          currentPage={currentPage}
          aria-label="Next page"
          page={currentPage + 1}
          label={<FiChevronRight />}
        />
      )}
    </ul>
  ) : null;
}
