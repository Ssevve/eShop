interface FormInputErrorMessageProps {
  message: string;
}

export function FormInputErrorMessage({ message }: FormInputErrorMessageProps) {
  return (
    <strong className="text-sm font-normal text-danger" role="alert">
      {message}
    </strong>
  );
}
