import { Link, useSearchParams } from 'react-router-dom';
import cx from 'classnames';

interface PaginationLinkProps {
  page: number;
  label: React.ReactNode;
  currentPage: number;
  ariaLabel: string;
}

function PaginationLink({ label, ariaLabel, currentPage, page }: PaginationLinkProps) {
  const [searchParams] = useSearchParams();
  searchParams.set('page', page.toString());

  return (
    <Link
      aria-label={ariaLabel}
      to={`${location.pathname}?${searchParams.toString()}`}
      className={cx(
        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-slate-200',
        currentPage === page && 'bg-primary-green text-white'
      )}
    >
      {label}
    </Link>
  );
}

export default PaginationLink;
