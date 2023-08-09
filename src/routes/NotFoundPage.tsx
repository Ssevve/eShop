import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="flex grow flex-col justify-center gap-8 py-8 text-center">
      <h1 className="text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">404</h1>
      <div>
        <p className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Page not found.</p>
        <p className="text-lg font-light text-gray-500">Sorry, we can't find this page.</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Button renderAs={Link} to="/products">
          Go to shop
        </Button>
        <Button renderAs={Link} to="/" variant="neutral">
          Go to home page
        </Button>
      </div>
    </section>
  );
}
