import { FiStar } from 'react-icons/fi';
import { MAX_PRODUCT_RATING } from 'lib/constants';

interface StarRatingProps {
  rating: number;
  ratingsCount: number;
}

function StarRating({ rating, ratingsCount }: StarRatingProps) {
  const flatRating = Math.floor(rating);
  const stars = Array.from({ length: MAX_PRODUCT_RATING }, (_, i) => (
    <FiStar
      fill={i < flatRating ? 'gold' : 'transparent'}
      strokeWidth={1}
      key={i}
      role="img"
      title="star"
    />
  ));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${flatRating} out of ${MAX_PRODUCT_RATING} stars`}
      role="img"
    >
      {stars}
      <span className="text-sm">{`(${ratingsCount} ratings)`}</span>
    </div>
  );
}

export default StarRating;
