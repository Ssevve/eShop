interface ErrorBoxProps {
  title?: string;
  errorMessage?: string;
}

function ErrorBox({ title, errorMessage }: ErrorBoxProps) {
  return (
    <div className="w-full rounded-sm border border-danger bg-red-100 p-4 text-danger">
      <header className="flex justify-between">
        <strong>{title || 'Error!'}</strong>
      </header>
      <p className="mt-2 text-sm">{errorMessage || 'Something went wrong. Please try again.'}</p>
    </div>
  );
}

export default ErrorBox;
