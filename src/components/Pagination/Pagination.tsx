import cx from 'classnames';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  totalItemCount: number;
  pageLimit: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({
  totalItemCount,
  pageLimit,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPageCount = Math.ceil(totalItemCount / itemsPerPage);

  const handleNextPageClick = () => setCurrentPage((current) => current + 1);
  const handlePreviousPageClick = () =>
    setCurrentPage((current) => current - 1);
  const handleMoreNextPagesClick = () =>
    setCurrentPage((current) => (current === 1 ? current + 3 : current + 2));
  const handleMorePreviousPagesClick = () =>
    setCurrentPage((current) =>
      current === totalPageCount ? current - 3 : current - 2
    );
  const handlePageChange = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    if (totalPageCount <= pageLimit) {
      // Show all available pages
      return new Array(totalPageCount).fill(0).map((_, i) => i + 1);
    }
    if (currentPage < 3) {
      // Show page numbers starting from 2
      return new Array(pageLimit - 1).fill(0).map((_, i) => i + 2);
    }
    if (currentPage > totalPageCount - pageLimit + 1) {
      // Show page numbers ending at totalPageCount - 1
      return new Array(pageLimit - 1)
        .fill(0)
        .map((_, i) => totalPageCount - pageLimit + i + 1);
    }
    // Show page numbers limiting the count to pageLimit
    return new Array(pageLimit)
      .fill(0)
      .map((_, i) => currentPage - Math.floor(pageLimit / 2) + i);
  };

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex items-center justify-center gap-2 rounded-sm py-8">
      <li>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-white"
          aria-label="Previous page"
          disabled={currentPage === 1}
          type="button"
          key="previousPage"
          onClick={handlePreviousPageClick}
        >
          <FiChevronLeft />
        </button>
      </li>
      <li>
        <button
          className={cx(
            'h-8 w-8 rounded-md',
            currentPage === 1
              ? 'bg-green-500 text-white hover:bg-green-500 hover:text-white'
              : 'bg-white text-black hover:bg-slate-200'
          )}
          disabled={currentPage === 1}
          type="button"
          key="1"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      </li>
      {currentPage > 3 && (
        <li>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200"
            aria-label={`Page ${
              currentPage === totalPageCount ? currentPage - 3 : currentPage - 2
            }`}
            type="button"
            key="morePreviousPages"
            onClick={handleMorePreviousPagesClick}
          >
            ...
          </button>
        </li>
      )}
      {getPageNumbers().map((page) => (
        <li key={page}>
          <button
            className={cx(
              'flex h-8 w-8 items-center justify-center rounded-md',
              currentPage === page
                ? 'bg-green-500 text-white hover:bg-green-500 hover:text-white'
                : 'bg-white text-black hover:bg-slate-200'
            )}
            aria-label={`Page ${page}`}
            disabled={currentPage === page}
            type="button"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      {currentPage < totalPageCount - 2 && (
        <li>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200"
            aria-label={`Page ${
              currentPage === 1 ? currentPage + 3 : currentPage + 2
            }`}
            type="button"
            key="moreNextPages"
            onClick={handleMoreNextPagesClick}
          >
            ...
          </button>
        </li>
      )}
      <li>
        <button
          className={cx(
            'flex h-8 w-8 items-center justify-center rounded-md',
            currentPage === totalPageCount
              ? 'bg-green-500 text-white hover:bg-green-500 hover:text-white'
              : 'bg-white text-black hover:bg-slate-200'
          )}
          aria-label={`Page ${totalPageCount}`}
          disabled={currentPage === totalPageCount}
          type="button"
          key={totalPageCount}
          onClick={() => handlePageChange(totalPageCount)}
        >
          {totalPageCount}
        </button>
      </li>
      <li>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 hover:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-white"
          aria-label="Next page"
          disabled={currentPage === totalPageCount}
          type="button"
          key="nextPage"
          onClick={handleNextPageClick}
        >
          <FiChevronRight />
        </button>
      </li>
    </ul>
  ) : null;
}

export default Pagination;
