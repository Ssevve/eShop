import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

function Error() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Error!
          </h1>
          <p className="mb-4 text-lg font-light text-gray-500">
            Could not get data from the server. Please try again later.
          </p>
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
    </section>
  );
}

export default Error;
