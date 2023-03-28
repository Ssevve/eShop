/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';

interface InputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, ...rest }, ref) => {
    return (
      <label className="grid">
        {label}
        <input
          className="w-0 min-w-full rounded-sm border border-black p-2"
          type={type}
          ref={ref}
          {...rest}
        />
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
