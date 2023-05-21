import { FiStar } from 'react-icons/fi';

interface StarRatingProps {
  rating: number;
  ratingsCount: number;
}

const MAX_RATING = 5;

function StarRating({ rating, ratingsCount }: StarRatingProps) {
  const stars = Array.from({ length: MAX_RATING }, (_, i) => (
    <FiStar
      fill={i < rating - 1 ? 'gold' : 'transparent'}
      strokeWidth={1}
      key={i}
    />
  ));

  return (
    <section className="flex items-center gap-1">
      {stars}
      <span>{`(${ratingsCount})`}</span>
    </section>
  );
}

export default StarRating;
