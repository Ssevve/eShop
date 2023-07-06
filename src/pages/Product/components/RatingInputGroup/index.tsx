import { forwardRef } from 'react';
import RatingInput from '../RatingInput';

type RatingInputGroupProps = React.PropsWithoutRef<JSX.IntrinsicElements['input']>;

const RatingInputGroup = forwardRef<HTMLInputElement, RatingInputGroupProps>(({ ...rest }, ref) => {
  return (
    <ul className="rounded-sm border bg-white font-medium sm:flex">
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
  );
});

RatingInputGroup.displayName = 'RatingInputGroup';

export default RatingInputGroup;
