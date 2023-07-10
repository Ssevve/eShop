import groceriesIllustration from 'assets/groceries.svg';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

function Home() {
  return (
    <section className="flex grow flex-col items-center justify-evenly gap-6 md:flex-row">
      <img
        className="aspect-square max-h-96 md:max-h-none md:w-1/2 xl:w-1/3"
        src={groceriesIllustration}
        alt="Bag of fresh vegetables"
      />
      <section className="flex flex-col gap-6 text-center md:text-start">
        <section className="mb-3 flex max-w-xl flex-col gap-6 md:mb-9 md:gap-9">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-6xl">
            Fast and{' '}
            <span className="underline-offset-3 underline decoration-primary decoration-4 lg:decoration-8">
              reliable
            </span>{' '}
            grocery delivery
          </h1>
          <p className="text-md lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ad, consequuntur vitae sed
            qui iusto quasi exercitationem nostrum. Neque, modi corporis officiis deleniti magni
            facere dignissimos debitis itaque cum tempora.
          </p>
        </section>
        <section className="mx-auto md:mx-0">
          <Button as={Link} to="/products">
            Shop now
          </Button>
        </section>
      </section>
    </section>
  );
}

export default Home;
