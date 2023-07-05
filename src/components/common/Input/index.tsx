/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form/dist/types';

interface InputProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  label: string;
  type: 'text' | 'email' | 'password';
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error = undefined, ...rest }, ref) => {
    return (
      <label className="grid gap-1">
        {label}
        <input
          aria-invalid={error ? 'true' : 'false'}
          className="w-0 min-w-full rounded-sm border p-3"
          type={type}
          ref={ref}
          {...rest}
        />
        {error && (
          <strong className="text-sm font-normal text-red-600" role="alert">
            {error.message}
          </strong>
        )}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
