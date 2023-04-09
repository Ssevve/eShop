import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  pageCount: number | null;
  setCurrentPage: (page: number) => void;
}

function Pagination({ pageCount, setCurrentPage }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = Array.from<number>({ length: pageCount || 0 });

  const handleNextPage = () => {
    const currentPage = Number(searchParams.get('page'));
    const nextPage = currentPage + 1;

    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', nextPage.toString());
    setSearchParams(updatedSearchParams.toString());

    setCurrentPage(nextPage);
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
