import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <section className="flex grow flex-col justify-center gap-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Error!</h1>
      <p className="text-lg font-light text-gray-500">Something went wrong. Please try again.</p>
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

export default ErrorPage;
