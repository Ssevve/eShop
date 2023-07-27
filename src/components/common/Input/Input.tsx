import { FormInputErrorMessage } from '@/components/common/FormInputErrorMessage';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form/dist/types';

interface InputProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  label: string;
  type: 'text' | 'email' | 'password';
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error = undefined, className, ...rest }, ref) => {
    return (
      <label className="grid gap-1">
        {label}
        <input
          aria-invalid={error ? 'true' : 'false'}
          className={`w-0 min-w-full rounded-sm border p-3 ${
            error ? 'border-danger' : ''
          } ${className}`}
          type={type}
          ref={ref}
          {...rest}
        />
        {error?.message && <FormInputErrorMessage message={error.message} />}
      </label>
    );
  }
);

Input.displayName = 'Input';
