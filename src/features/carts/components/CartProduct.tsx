import { PriceGroup } from '@/components/common/PriceGroup';
import theme from '@/lib/theme';
import { Link } from 'react-router-dom';
import { CartProduct as CartProductType } from '../types';
import { CartProductControls } from './CartProductControls';

interface CartProductProps {
  product: CartProductType;
  verticalInput?: boolean;
}

export function CartProduct({ product, verticalInput }: CartProductProps) {
  const imageHeight = theme.spacing[40];

  return (
    <div className="grid grid-cols-2 place-items-center gap-3 py-3 sm:grid-cols-3">
      <Link
        className="col-span-2 grid w-full grid-cols-2 place-items-center gap-3 hover:underline sm:col-span-1 sm:justify-items-start"
        to={`/products/${product?.product._id}`}
      >
        <img
          className="col-span-1 mx-auto block h-40 object-scale-down"
          height={imageHeight}
          src={product.product.imageUrl}
          alt={product.product.name}
        />
        <span className="col-span-1">{product.product.name}</span>
      </Link>
      <section className="row-start-2 flex items-end sm:col-start-2 sm:row-start-1">
        <PriceGroup price={product.product.price} discountPrice={product.product.discountPrice} />
      </section>
      <CartProductControls
        verticalInput={verticalInput}
        productId={product.product._id}
        initialAmount={product.amount}
      />
    </div>
  );
}
