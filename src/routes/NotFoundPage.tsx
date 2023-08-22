import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import notFoundImage from '@/assets/404.svg';
import theme from '@/lib/theme';

export function NotFoundPage() {
  return (
    <section className="flex grow flex-col justify-center gap-8 py-8 text-center">
      <div>
        <img
          src={notFoundImage}
          height={theme.spacing[60]}
          alt="Page not found"
          className="mx-auto max-h-60"
        />
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
