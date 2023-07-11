import theme from 'lib/theme';
import { forwardRef } from 'react';
import { FiStar } from 'react-icons/fi';

interface RatingInputProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  rating: number;
}

const RatingInput = forwardRef<HTMLInputElement, RatingInputProps>(({ rating, ...rest }, ref) => {
  return (
    <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
      <input
        ref={ref}
        className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
        type="radio"
        value={rating}
        {...rest}
        required
      />
      <span className="mr-1.5">{rating}</span>{' '}
      <FiStar
        aria-label={rating === 1 ? 'star' : 'stars'}
        strokeWidth={0}
        fill={theme.colors.amber[300]}
      />
    </label>
  );
});

RatingInput.displayName = 'RatingInput';

export default RatingInput;
