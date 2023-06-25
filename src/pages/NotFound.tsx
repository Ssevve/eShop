import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
function NotFound() {
  return (
    <div className="mx-auto max-w-screen-2xl bg-white px-4 py-8 lg:px-6 lg:py-16">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Page not found.</p>
        <p className="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page.</p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Button as={Link} to="/products">
            Go to shop
          </Button>
          <Button as={Link} variant="neutral" to="/">
            Go to home page
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
