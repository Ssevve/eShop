import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import FormInputErrorMessage from '../FormInputErrorMessage';

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
          className={`w-0 min-w-full rounded-sm border p-3 ${error ? 'border-danger' : ''}`}
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

export default Input;
