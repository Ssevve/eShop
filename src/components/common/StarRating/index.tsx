import { FiStar } from 'react-icons/fi';
import { productConstraints } from 'lib/constants';
import theme from 'lib/theme';

type StarRatingProps = {
  rating: number;
  size?: number;
} & (
  | {
      ratingsCount: number;
      showRatingsCount: true;
    }
  | {
      ratingsCount?: never;
      showRatingsCount?: never;
    }
);

function StarRating({ rating, ratingsCount, size = 16, ...rest }: StarRatingProps) {
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
        {rating}
      </span>
      {rest.showRatingsCount && (
        <span className="text-sm">
          {`(${ratingsCount} ${ratingsCount === 1 ? 'rating' : 'ratings'})`}
        </span>
      )}
    </div>
  );
}

export default StarRating;
