import { FiStar } from 'react-icons/fi';
import { productConstraints } from 'lib/constants';
import theme from 'lib/theme';
import formatRating from './formatRating';

interface StarRatingProps {
  rating: number;
  ratingsCount?: number;
  size?: number;
}

function StarRating({ rating, ratingsCount = undefined, size = 16 }: StarRatingProps) {
  const flatRating = Math.floor(rating);
  const stars = Array.from({ length: productConstraints.rating.max }, (_, i) => (
    <FiStar
      fill={i < flatRating ? theme.colors.amber['300'] : theme.colors.gray['400']}
      key={i}
      strokeWidth={0}
      role="img"
      aria-label={i < flatRating ? 'Filled star' : 'Empty star'}
      size={size}
    />
  ));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${flatRating} out of ${productConstraints.rating.max} stars`}
    >
      {stars}
      <span className="ml-3 mr-3 rounded-sm bg-green-100 px-3 py-0.5 text-xs font-semibold text-primary">
        {formatRating(rating)}
      </span>
      {ratingsCount && <span className="text-sm">{`(${ratingsCount} ratings)`}</span>}
    </div>
  );
}

export default StarRating;
