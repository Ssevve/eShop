type FormInputErrorMessageProps = { message: string };

function FormInputErrorMessage({ message }: FormInputErrorMessageProps) {
  return (
    <strong className="text-sm font-normal text-danger" role="alert">
      {message}
    </strong>
  );
}

export default FormInputErrorMessage;
