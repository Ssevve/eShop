import ArrowButton from './components/ArrowButton';
import DotsButton from './components/DotsButton';
import PageButton from './components/PageButton';

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

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex flex-wrap items-center justify-center gap-2 rounded-sm py-8">
      {currentPage > 1 && (
        <ArrowButton action="previous" setCurrentPage={setCurrentPage} />
      )}
      <PageButton
        pageNumber={1}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {currentPage >= siblingDelta + 4 && (
        <DotsButton
          setCurrentPage={setCurrentPage}
          pageNumber={currentPage - siblingDelta - 1}
        />
      )}
      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          pageNumber={pageNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ))}
      {currentPage <= totalPageCount - 3 - siblingDelta && (
        <DotsButton
          setCurrentPage={setCurrentPage}
          pageNumber={currentPage + siblingDelta + 1}
        />
      )}
      <PageButton
        pageNumber={totalPageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {currentPage < totalPageCount && (
        <ArrowButton action="next" setCurrentPage={setCurrentPage} />
      )}
    </ul>
  ) : null;
}

export default Pagination;
