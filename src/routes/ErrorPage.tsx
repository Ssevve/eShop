import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import errorImage from '@/assets/error.svg';
import theme from '@/lib/theme';

export function ErrorPage() {
  return (
    <section className="flex grow flex-col justify-center gap-8 py-8 text-center">
      <div>
        <img src={errorImage} height={theme.spacing[60]} alt="Error" className="mx-auto max-h-60" />
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Error!</h1>
      </div>
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
