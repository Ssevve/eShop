interface PaginationButtonDefaultProps {
  disabled?: boolean;
}

interface PaginationButtonProps extends PaginationButtonDefaultProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  label: React.ReactNode;
}

function PaginationButton({ onClick, ariaLabel, disabled = false, label }: PaginationButtonProps) {
  return (
    <button
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-slate-200 disabled:bg-primary-green disabled:text-white"
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default PaginationButton;
