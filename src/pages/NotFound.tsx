import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

function NotFound() {
  return (
    <section className="flex flex-col gap-6 text-center">
      <h1 className="text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">404</h1>
      <div>
        <p className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Page not found.</p>
        <p className="text-lg font-light text-gray-500">Sorry, we can't find that page.</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Button as={Link} to="/products">
          Go to shop
        </Button>
        <Button as={Link} variant="neutral" to="/">
          Go to home page
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
