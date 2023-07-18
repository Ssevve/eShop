import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import RatingInput from './RatingInput';
import FormInputErrorMessage from 'components/common/FormInputErrorMessage';

interface RatingInputGroupProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  error?: FieldError;
}

const RatingInputGroup = forwardRef<HTMLInputElement, RatingInputGroupProps>(
  ({ error, ...rest }, ref) => {
    return (
      <div>
        <ul
          className={`mb-3 rounded-sm border bg-white font-medium sm:flex ${
            error && 'border-danger'
          }`}
        >
          <li className="w-full border-b sm:border-b-0 sm:border-r">
            <RatingInput rating={1} ref={ref} {...rest} />
          </li>
          <li className="w-full border-b sm:border-b-0 sm:border-r">
            <RatingInput rating={2} ref={ref} {...rest} />
          </li>
          <li className="w-full border-b sm:border-b-0 sm:border-r">
            <RatingInput rating={3} ref={ref} {...rest} />
          </li>
          <li className="w-full border-b sm:border-b-0 sm:border-r">
            <RatingInput rating={4} ref={ref} {...rest} />
          </li>
          <li className="w-full">
            <RatingInput rating={5} ref={ref} {...rest} />
          </li>
        </ul>
        {error?.message && <FormInputErrorMessage message={error.message} />}
      </div>
    );
  }
);

RatingInputGroup.displayName = 'RatingInputGroup';

export default RatingInputGroup;
