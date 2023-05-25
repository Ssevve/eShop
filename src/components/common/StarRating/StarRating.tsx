import { FiStar } from 'react-icons/fi';

interface StarRatingProps {
  rating: number;
  ratingsCount: number;
}

const MAX_RATING = 5;

function StarRating({ rating, ratingsCount }: StarRatingProps) {
  const flatRating = Math.floor(rating);
  const stars = Array.from({ length: MAX_RATING }, (_, i) => (
    <FiStar
      fill={i < flatRating ? 'gold' : 'transparent'}
      strokeWidth={1}
      key={i}
    />
  ));

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rating: ${flatRating} out of ${MAX_RATING} stars`}
    >
      {stars}
      <span className="text-sm">{`(${ratingsCount} ratings)`}</span>
    </div>
  );
}

export default StarRating;
