import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts } from 'features/products/productsSlice';

interface PaginationProps {
  pageLimit: number;
  productsPerPage: number;
}

function Pagination({ pageLimit, productsPerPage }: PaginationProps) {
  const dispatch = useAppDispatch();
  const totalProductCount = useAppSelector(
    (state) => state.products.totalProductCount
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', page.toString());
    setSearchParams(updatedSearchParams);
    setCurrentPage(page);
  };

  const totalPageCount = Math.ceil(totalProductCount / productsPerPage);

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

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: productsPerPage }));
  }, [currentPage]);

  useEffect(() => {
    const requestedPage = Number(searchParams.get('page'));
    if (requestedPage) setCurrentPage(requestedPage);
    else changePage(1);
  }, []);

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex items-center justify-center rounded-sm">
      <li>
        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500 bg-white text-green-500"
          type="button"
          key="prev"
          onClick={() => changePage(currentPage - 1)}
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
          onClick={() => changePage(1)}
        >
          1
        </button>
      </li>
      {currentPage > 3 && (
        <li>
          <button
            aria-label={`${currentPage - 2}`}
            className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500"
            type="button"
            key="twoDown"
            onClick={() => changePage(currentPage - 2)}
          >
            ...
          </button>
        </li>
      )}
      {getPageNumbers().map((page) => (
        <li key={page}>
          <button
            disabled={currentPage === page}
            className={cx(
              'flex h-8 w-8 items-center justify-center border-l border-t border-b border-green-500',
              page === currentPage ? 'bg-green-500 text-white' : 'bg-white'
            )}
            type="button"
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        </li>
      ))}
      {currentPage < totalPageCount - 2 && (
        <li>
          <button
            aria-label={`${currentPage + 2}`}
            className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500"
            type="button"
            key="twoUp"
            onClick={() => changePage(currentPage + 2)}
          >
            ...
          </button>
        </li>
      )}
      <li>
        <button
          disabled={currentPage === totalPageCount}
          className={cx(
            'flex h-8 w-8 items-center justify-center border-l border-t border-b border-green-500',
            currentPage === totalPageCount
              ? 'bg-green-500 text-white'
              : 'bg-white'
          )}
          type="button"
          key={totalPageCount}
          onClick={() => changePage(totalPageCount)}
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
          onClick={() => changePage(currentPage + 1)}
        >
          <FiChevronRight />
        </button>
      </li>
    </ul>
  ) : null;
}

export default Pagination;
