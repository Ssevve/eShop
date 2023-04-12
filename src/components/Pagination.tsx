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

  const setPageURLSearchParam = (page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', page.toString());
    setSearchParams(updatedSearchParams);
  };

  const totalPageCount = Math.ceil(totalProductCount / productsPerPage);

  const getPageNumbers = () => {
    if (totalPageCount <= pageLimit) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }
    if (currentPage < 3) {
      return Array.from({ length: pageLimit }, (_, i) => 1 + i);
    }
    if (currentPage > totalPageCount - pageLimit + 1) {
      return Array.from(
        { length: pageLimit },
        (_, i) => totalPageCount - pageLimit + i + 1
      );
    }
    return Array.from(
      { length: pageLimit },
      (_, i) => currentPage - Math.floor(pageLimit / 2) + i
    );
  };

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: productsPerPage }));
  }, [currentPage]);

  useEffect(() => {
    const requestedPage = Number(searchParams.get('page'));

    if (requestedPage) {
      setCurrentPage(requestedPage);
    } else {
      const initialPage = 1;
      setPageURLSearchParam(initialPage);
      setCurrentPage(initialPage);
    }
  }, []);

  const handlePageChange = (page: number) => {
    setPageURLSearchParam(page);
    setCurrentPage(page);
  };

  return totalPageCount > 1 ? (
    <ul className="mx-auto flex flex-wrap items-center justify-center rounded-sm">
      <li>
        <button
          aria-label="Previous page"
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center border-t border-b border-l border-green-500 bg-white text-green-500 shadow-md"
          type="button"
          key="prev"
        >
          <FiChevronLeft />
        </button>
      </li>
      {getPageNumbers().map((page) => (
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
