import cx from 'classnames';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalItemCount: number;
  currentPage: number;
  pageLimit: number;
  itemsPerPage: number;
}

function Pagination({
  onPageChange,
  totalItemCount,
  currentPage,
  pageLimit,
  itemsPerPage,
}: PaginationProps) {
  const totalPageCount = Math.ceil(totalItemCount / itemsPerPage);

  const getPageNumbers = () => {
    if (totalPageCount <= pageLimit) {
      // Show all available pages
      return new Array(totalPageCount).fill(0).map((_, i) => i + 1);
    }
    if (currentPage < 3) {
      // Show page numbers starting from 2
      return new Array(pageLimit)
        .fill(0)
        .map((_, i) => i + 1)
        .slice(1);
    }
    if (currentPage > totalPageCount - pageLimit + 1) {
      // Show page numbers ending at totalPageCount - 1
      return new Array(pageLimit)
        .fill(0)
        .map((_, i) => totalPageCount - pageLimit + i + 1)
        .slice(0, -1);
    }
    // Show page numbers limiting the count to pageLimit
    return new Array(pageLimit)
      .fill(0)
      .map((_, i) => currentPage - Math.floor(pageLimit / 2) + i);
  };

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex items-center justify-center rounded-sm">
      <li>
        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500 bg-white text-green-500"
          type="button"
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FiChevronLeft />
        </button>
      </li>
      <li>
        <button
          disabled={currentPage === 1}
          className={cx(
            'flex h-8 w-8 items-center justify-center border-l border-t border-b border-green-500',
            currentPage === 1 ? 'bg-green-500 text-white' : 'bg-white'
          )}
          type="button"
          key="1"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      </li>
      {currentPage > 3 && (
        <li>
          <button
            aria-label={`Page ${
              currentPage === totalPageCount ? currentPage - 3 : currentPage - 2
            }`}
            className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500"
            type="button"
            key="backMore"
            onClick={() =>
              currentPage === totalPageCount
                ? onPageChange(currentPage - 3)
                : onPageChange(currentPage - 2)
            }
          >
            ...
          </button>
        </li>
      )}
      {getPageNumbers().map((page) => (
        <li key={page}>
          <button
            aria-label={`Page ${page}`}
            disabled={currentPage === page}
            className={cx(
              'flex h-8 w-8 items-center justify-center border-l border-t border-b border-green-500',
              page === currentPage ? 'bg-green-500 text-white' : 'bg-white'
            )}
            type="button"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      {currentPage < totalPageCount - 2 && (
        <li>
          <button
            aria-label={`Page ${
              currentPage === 1 ? currentPage + 3 : currentPage + 2
            }`}
            className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500"
            type="button"
            key="nextMore"
            onClick={() =>
              currentPage === 1
                ? onPageChange(currentPage + 3)
                : onPageChange(currentPage + 2)
            }
          >
            ...
          </button>
        </li>
      )}
      <li>
        <button
          aria-label={`Page ${totalPageCount}`}
          disabled={currentPage === totalPageCount}
          className={cx(
            'flex h-8 w-8 items-center justify-center border-l border-t border-b border-green-500',
            currentPage === totalPageCount
              ? 'bg-green-500 text-white'
              : 'bg-white'
          )}
          type="button"
          key={totalPageCount}
          onClick={() => onPageChange(totalPageCount)}
        >
          {totalPageCount}
        </button>
      </li>
      <li>
        <button
          aria-label="Next page"
          disabled={currentPage === totalPageCount}
          className="flex h-8 w-8 items-center justify-center border border-green-500 bg-white text-green-500"
          type="button"
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <FiChevronRight />
        </button>
      </li>
    </ul>
  ) : null;
}

export default Pagination;
