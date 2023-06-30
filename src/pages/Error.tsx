import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

function Error() {
  return (
    <section className="flex h-screen flex-col justify-center gap-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Error!</h1>
      <p className="text-lg font-light text-gray-500">
        Something went wrong. Please try again later.
      </p>
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

export default Error;
