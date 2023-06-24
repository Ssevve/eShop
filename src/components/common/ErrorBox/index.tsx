interface ErrorBoxProps {
  isError: boolean;
  title: string;
  errorMessage: string;
}

function ErrorBox({ isError, title, errorMessage }: ErrorBoxProps) {
  if (!isError) return null;
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
