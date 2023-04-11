import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectCurrentPage,
  selectProductsPerPage,
  setCurrentPage,
} from '../paginationSlice';

function Pagination() {
  const dispatch = useAppDispatch();
  const productsPerPage = useAppSelector(selectProductsPerPage);
  const totalProductCount = useAppSelector(
    (state) => state.products.totalProductCount
  );
  const currentPage = useAppSelector(selectCurrentPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const setPageURLSearchParam = (page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', page.toString());
    setSearchParams(updatedSearchParams);
  };

  useEffect(() => {
    const requestedPage = Number(searchParams.get('page'));
    if (!requestedPage) {
      const initialPage = 1;
      setPageURLSearchParam(initialPage);
      dispatch(setCurrentPage(initialPage));
    } else {
      dispatch(setCurrentPage(requestedPage));
    }
  }, []);

  const handlePageChange = (page: number) => {
    setPageURLSearchParam(page);
    dispatch(setCurrentPage(page));
  };

  const totalPageCount = Math.ceil(totalProductCount / productsPerPage);

  const visiblePageCount = 5;

  useEffect(() => {
    console.log({ totalProductCount, totalPageCount });
    if (totalPageCount <= visiblePageCount) {
      setPageNumbers([
        ...Array.from({ length: totalPageCount }, (_, i) => i + 1),
      ]);
    } else if (currentPage < 3) {
      setPageNumbers([
        ...Array.from({ length: visiblePageCount }, (_, i) => 1 + i),
      ]);
    } else if (currentPage >= totalPageCount - visiblePageCount) {
      setPageNumbers([
        ...Array.from(
          { length: visiblePageCount },
          (_, i) => totalPageCount - visiblePageCount + i
        ),
      ]);
    } else {
      setPageNumbers([
        ...Array.from(
          { length: visiblePageCount },
          (_, i) => currentPage - Math.floor(visiblePageCount / 2) + i
        ),
      ]);
    }
  }, [currentPage]);

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex flex-wrap items-center justify-center rounded-sm">
      <li>
        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500 bg-white  text-green-500 shadow-md"
          type="button"
          key="prev"
        >
          <FiChevronLeft />
        </button>
      </li>
      {pageNumbers.map((page) => (
        <li key={page}>
          <button
            className={cx(
              'flex h-8 w-8 items-center justify-center border-l border-t border-b border-green-500',
              page === currentPage ? 'bg-green-500 text-white' : 'bg-white'
            )}
            type="button"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button
          aria-label="Next page"
          disabled={currentPage === totalPageCount}
          className="flex h-8 w-8 items-center justify-center border border-green-500 bg-white text-green-500 shadow-md"
          type="button"
          key="next"
        >
          <FiChevronRight />
        </button>
      </li>
    </ul>
  ) : null;
}

export default Pagination;
