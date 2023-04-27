import cx from 'classnames';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  totalItemCount: number;
  siblingDelta: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({
  totalItemCount,
  siblingDelta,
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

  const paginate = (current: number, last: number, delta = 1) => {
    const leftSibling = current - delta;
    const rightSibling = current + delta + 1;
    const pageNumbers = [];

    for (let i = 2; i < last; i += 1) {
      if (i >= leftSibling && i < rightSibling) {
        pageNumbers.push(i);
      }
    }

    if (current === 3 + delta) pageNumbers.unshift(2);
    if (current === last - 2 - delta) pageNumbers.push(last - 1);

    return pageNumbers;
  };

  const pageNumbers = paginate(currentPage, totalPageCount, siblingDelta);

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex flex-wrap items-center justify-center gap-2 rounded-sm py-8">
      <li>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 disabled:hidden"
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
          aria-label="Page 1"
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
      {currentPage >= siblingDelta + 4 && (
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
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber}>
          <button
            className={cx(
              'flex h-8 w-8 items-center justify-center rounded-md',
              currentPage === pageNumber
                ? 'bg-green-500 text-white hover:bg-green-500 hover:text-white'
                : 'bg-white text-black hover:bg-slate-200'
            )}
            aria-label={`Page ${pageNumber}`}
            disabled={currentPage === pageNumber}
            type="button"
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      {currentPage <= totalPageCount - 3 - siblingDelta && (
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
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 disabled:hidden"
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
