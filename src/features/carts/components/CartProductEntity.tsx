import { CartProductControls } from '@/components/common/CartProductControls';
import { PriceGroup } from '@/components/common/PriceGroup';
import theme from '@/lib/theme';
import { Link } from 'react-router-dom';

interface CartProductEntityProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  amount: number;
  discountPrice: number;
  cartId: string;
}

export function CartProductEntity({
  id,
  name,
  imageUrl,
  price,
  amount,
  discountPrice,
  cartId,
}: CartProductEntityProps) {
  const imageHeight = theme.spacing[40];

  return (
    <div className="grid grid-cols-2 place-items-center gap-4 py-4 sm:grid-cols-3">
      <Link
        className="col-span-2 grid w-full grid-cols-2 place-items-center gap-4 hover:underline sm:col-span-1 sm:justify-items-start"
        to={`/products/${id}`}
      >
        <img
          className="col-span-1 mx-auto block h-40 object-scale-down"
          height={imageHeight}
          src={imageUrl}
          alt={name}
        />
        <span className="col-span-1">{name}</span>
      </Link>
      <section className="row-start-2 flex items-end sm:col-start-2 sm:row-start-1">
        <PriceGroup price={price} discountPrice={discountPrice} />
      </section>
      <section className="sm:justify-self-end">
        <CartProductControls
          cartId={cartId || ''}
          productId={id}
          productName={name}
          productAmount={amount}
        />
      </section>
    </div>
  );
}
