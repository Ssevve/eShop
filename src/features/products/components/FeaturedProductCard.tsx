import { Card } from '@/components/common/Card/Card';
import { PriceGroup } from '@/components/common/PriceGroup';
import { StarRating } from '@/components/common/StarRating';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface FeaturedCardProps {
  product: Product;
}

export function FeaturedProductCard({ product }: FeaturedCardProps) {
  return (
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
  );
}
