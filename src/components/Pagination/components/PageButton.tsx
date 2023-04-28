import PaginationButtonBase from './PaginationButtonBase';

interface PageButtonProps {
  pageNumber: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function PageButton({
  pageNumber,
  currentPage,
  setCurrentPage,
}: PageButtonProps) {
  return (
    <PaginationButtonBase
      ariaLabel={`Page ${pageNumber}`}
      disabled={currentPage === pageNumber}
      onClick={() => setCurrentPage(pageNumber)}
    >
      {pageNumber}
    </PaginationButtonBase>
  );
}

export default PageButton;
