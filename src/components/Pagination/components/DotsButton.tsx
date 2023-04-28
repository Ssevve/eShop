import PaginationButtonBase from './PaginationButtonBase';

interface DotsButtonProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
}

function DotsButton({ setCurrentPage, pageNumber }: DotsButtonProps) {
  return (
    <PaginationButtonBase
      ariaLabel={`Page ${pageNumber}`}
      onClick={() => setCurrentPage(pageNumber)}
    >
      ...
    </PaginationButtonBase>
  );
}

export default DotsButton;
