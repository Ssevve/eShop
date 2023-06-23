import { Link } from 'react-router-dom';

function HomeLink() {
  return (
    <Link
      className="flex w-max items-center justify-center gap-4 rounded-sm bg-primary px-6 py-2 uppercase text-white hover:bg-primary-hover"
      to="/"
    >
      Home page
    </Link>
  );
}

export default HomeLink;
