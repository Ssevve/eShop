import groceriesIllustration from '@/assets/groceries.svg';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card/Card';
import { List } from '@/components/common/List';
import { PriceGroup } from '@/components/common/PriceGroup';
import { StarRating } from '@/components/common/StarRating';
import { useGetProductsQuery } from '@/features/products';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { data: bestDealsData } = useGetProductsQuery({
    page: 1,
    category: 'Discounts',
    sort: 'discountPrice',
    order: 'asc',
  });

  const { data: topRatedData } = useGetProductsQuery({
    page: 1,
    category: null,
    sort: 'rating',
    order: 'desc',
  });

  const { data: mostRatedData } = useGetProductsQuery({
    page: 1,
    category: null,
    sort: 'ratingsCount',
    order: 'desc',
  });

  return (
    <section className="flex flex-col gap-16 py-8">
      <section className="flex grow flex-col items-center justify-evenly gap-8 md:flex-row">
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
            <Button renderAs={Link} to="/products">
              Shop now
            </Button>
          </section>
        </section>
      </section>
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-tight">Best Deals</h2>
        <List
          items={bestDealsData?.products}
          className="flex gap-4 overflow-x-auto py-4"
          renderItem={(product) => (
            <Card className="w-48">
              <Link className="flex flex-col gap-4 divide-y" to={`/products/${product._id}`}>
                <div className="flex flex-col gap-4">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <StarRating ratingsCount={product.ratingsCount} rating={product.rating} />
                </div>
                <div className="pt-4">
                  <PriceGroup price={product.price} discountPrice={product.discountPrice} />
                </div>
              </Link>
            </Card>
          )}
        />
      </section>
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-tight">Top Rated</h2>
        <List
          items={topRatedData?.products}
          className="flex gap-4 overflow-x-auto py-4"
          renderItem={(product) => (
            <Card className="w-48">
              <Link className="flex flex-col gap-4 divide-y" to={`/products/${product._id}`}>
                <div className="flex flex-col gap-4">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <StarRating ratingsCount={product.ratingsCount} rating={product.rating} />
                </div>
                <div className="pt-4">
                  <PriceGroup price={product.price} discountPrice={product.discountPrice} />
                </div>
              </Link>
            </Card>
          )}
        />
      </section>
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-tight">Most Rated</h2>
        <List
          items={mostRatedData?.products}
          className="flex gap-4 overflow-x-auto py-4"
          renderItem={(product) => (
            <Card className="w-48">
              <Link className="flex flex-col gap-4 divide-y" to={`/products/${product._id}`}>
                <div className="flex flex-col gap-4">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                  <StarRating ratingsCount={product.ratingsCount} rating={product.rating} />
                </div>
                <div className="pt-4">
                  <PriceGroup price={product.price} discountPrice={product.discountPrice} />
                </div>
              </Link>
            </Card>
          )}
        />
      </section>
    </section>
  );
}
