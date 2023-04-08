import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { AnyAction } from '@reduxjs/toolkit';

interface PaginationProps {
  pageCount: number | null;
  onClickAction: (page: number) => AnyAction;
}

function Pagination({ pageCount, onClickAction }: PaginationProps) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = Array.from<number>({ length: pageCount || 0 });

  const handleNextPage = () => {
    const currentPage = Number(searchParams.get('page'));
    const nextPage = currentPage + 1;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', nextPage.toString());
    setSearchParams(updatedSearchParams.toString());

    dispatch(onClickAction(nextPage));
  };

  return (
    <div>
      <button type="button" onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
