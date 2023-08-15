import { FormInputErrorMessage } from '@/components/common/FormInputErrorMessage';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { productConstraints } from '@/lib/constants';
import theme from '@/lib/theme';
import { FiStar } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface RatingInputGroupProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  error?: FieldError;
}

export const RatingInputGroup = forwardRef<HTMLInputElement, RatingInputGroupProps>(
  ({ error, ...rest }, ref) => {
    const ratingInputs = [];
    for (let i = productConstraints.rating.min; i <= productConstraints.rating.max; i++) {
      ratingInputs.push(
        <li className="w-full" key={i}>
          <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
            <input
              ref={ref}
              className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
              type="radio"
              value={i}
              {...rest}
              required
            />
            <span className="mr-1.5">{i}</span>{' '}
            <FiStar
              aria-label={i === 1 ? 'star' : 'stars'}
              strokeWidth={0}
              fill={theme.colors.amber[300]}
            />
          </label>
        </li>
      );
    }

    return (
      <div>
        <ul
          className={twMerge(
            'mb-3 divide-x-0 divide-y rounded-sm border bg-white font-medium sm:flex sm:divide-x sm:divide-y-0',
            error && 'divide-danger border-danger'
          )}
        >
          {ratingInputs}
        </ul>
        {error?.message && <FormInputErrorMessage message={error.message} />}
      </div>
    );
  }
);

RatingInputGroup.displayName = 'RatingInputGroup';
