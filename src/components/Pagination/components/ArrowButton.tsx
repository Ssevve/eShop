import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import PaginationButtonBase from './PaginationButtonBase';

interface ArrowButtonProps {
  action: 'previous' | 'next';
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function ArrowButton({ action, setCurrentPage }: ArrowButtonProps) {
  const isPreviousButton = action === 'previous';

  const handleClick = () =>
    setCurrentPage((current) => (isPreviousButton ? current - 1 : current + 1));
  return (
    <PaginationButtonBase
      ariaLabel={isPreviousButton ? 'Previous page' : 'Next page'}
      onClick={handleClick}
    >
      {isPreviousButton ? <FiChevronLeft /> : <FiChevronRight />}
    </PaginationButtonBase>
  );
}

export default ArrowButton;
