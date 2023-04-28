import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import PaginationButton from './PaginationButton';

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

  const handlePreviousPageClick = () =>
    setCurrentPage((current) => current - 1);
  const handleFirstPageClick = () => setCurrentPage(1);
  const handleMorePreviousPagesClick = () =>
    setCurrentPage((current) => current - siblingDelta - 1);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleMoreNextPagesClick = () =>
    setCurrentPage((current) => current + siblingDelta + 1);
  const handleLastPageClick = () => setCurrentPage(totalPageCount);
  const handleNextPageClick = () => setCurrentPage((current) => current + 1);

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex flex-wrap items-center justify-center gap-2 rounded-sm py-8">
      {currentPage > 1 && (
        <PaginationButton
          onClick={handlePreviousPageClick}
          ariaLabel="Previous page"
          label={<FiChevronLeft />}
        />
      )}
      <PaginationButton
        onClick={handleFirstPageClick}
        ariaLabel="Page 1"
        disabled={currentPage === 1}
        label="1"
      />
      {currentPage >= siblingDelta + 4 && (
        <PaginationButton
          onClick={handleMorePreviousPagesClick}
          ariaLabel={`Page ${currentPage - siblingDelta - 1}`}
          label="..."
        />
      )}
      {pageNumbers.map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          ariaLabel={`Page ${pageNumber}`}
          disabled={currentPage === pageNumber}
          label={pageNumber}
        />
      ))}
      {currentPage <= totalPageCount - 3 - siblingDelta && (
        <PaginationButton
          onClick={handleMoreNextPagesClick}
          ariaLabel={`Page ${currentPage - siblingDelta - 1}`}
          label="..."
        />
      )}
      <PaginationButton
        ariaLabel={`Page ${totalPageCount}`}
        onClick={handleLastPageClick}
        disabled={currentPage === totalPageCount}
        label={totalPageCount}
      />
      {currentPage < totalPageCount && (
        <PaginationButton
          onClick={handleNextPageClick}
          ariaLabel="Next page"
          label={<FiChevronRight />}
        />
      )}
    </ul>
  ) : null;
}

export default Pagination;
