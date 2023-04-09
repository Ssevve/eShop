import { useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentPage, setCurrentPage } from './paginationSlice';

interface PaginationProps {
  totalPageCount: number;
}

function Pagination({ totalPageCount }: PaginationProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const [searchParams, setSearchParams] = useSearchParams();

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
  const pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);
  return (
    <ul className="flex gap-2">
      {pages.map((page) => (
        <li key={page}>
          <button
            className={cx(
              'flex h-8 w-8 items-center justify-center rounded-sm bg-white shadow-md',
              page === currentPage && 'bg-green-500 text-white'
            )}
            type="button"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
