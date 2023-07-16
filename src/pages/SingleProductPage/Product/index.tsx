import PriceGroup from 'components/common/PriceGroup';
import StarRating from 'components/common/StarRating';
import theme from 'lib/theme';
import ProductControls from './ProductControls';
import { Product as ProductType } from 'app/services/products';

interface ProductProps {
  product: ProductType;
}

function Product({ product }: ProductProps) {
  return (
    <div className="mb-12 flex flex-1 flex-wrap items-center justify-center gap-12">
      <img
        className="w-full max-w-sm object-scale-down"
        height={theme.spacing[96]}
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="flex w-full flex-1 flex-col gap-6">
        <header className="grid gap-y-3">
          <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
          <span className="mb-3 text-sm font-bold uppercase text-gray-400">{product.category}</span>
          <StarRating rating={product.rating} ratingsCount={product.ratingsCount} />
        </header>
        <section>
          <p>
            <span className="mr-1 font-semibold">Brand:</span>
            {product.brand}
          </p>
          <p>
            <span className="mr-1 font-semibold">Quantity:</span>
            {product.quantity}
          </p>
        </section>
        <p className="break-words">{product.description}</p>
        <PriceGroup price={product.price} discountPrice={product.discountPrice} />
        <ProductControls product={product} />
      </div>
    </div>
  );
}

export default Product;