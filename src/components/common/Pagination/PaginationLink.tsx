import { Link, useSearchParams } from 'react-router-dom';
import cx from 'classnames';

interface PaginationLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  page: number;
  label: React.ReactNode;
  currentPage: number;
}

function PaginationLink({ label, currentPage, page, ...rest }: PaginationLinkProps) {
  const [searchParams] = useSearchParams();
  searchParams.set('page', page.toString());

  return (
    <Link
      to={`${location.pathname}?${searchParams.toString()}`}
      className={cx(
        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-400 hover:text-white',
        currentPage === page && 'bg-primary text-white hover:bg-primary'
      )}
      {...rest}
    >
      {label}
    </Link>
  );
}

export default PaginationLink;
