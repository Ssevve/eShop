interface ErrorBoxProps {
  title?: string;
  errorMessage?: string;
}

function ErrorBox({
  title = 'Error!',
  errorMessage = 'Something went wrong. Please try again.',
}: ErrorBoxProps) {
  return (
    <div className="w-full rounded-sm border border-danger bg-red-100 p-4 text-danger">
      <header className="flex justify-between">
        <strong>{title}</strong>
      </header>
      <p className="mt-2 text-sm">{errorMessage}</p>
    </div>
  );
}

export default ErrorBox;
