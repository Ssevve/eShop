import { Link, useSearchParams } from 'react-router-dom';

interface PaginationLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  page: number;
  label: React.ReactNode;
  currentPage: number;
}

export function PaginationLink({ label, currentPage, page, ...rest }: PaginationLinkProps) {
  const [searchParams] = useSearchParams();
  searchParams.set('page', page.toString());

  const isCurrentPage = currentPage === page;

  return (
    <Link
      to={`${window.location.pathname}?${searchParams.toString()}`}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-400 hover:text-white ${
        isCurrentPage && 'bg-primary text-white hover:bg-primary'
      }`}
      {...rest}
    >
      {label}
    </Link>
  );
}
