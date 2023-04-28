interface PaginationButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  disabled?: boolean;
  label: string | React.ReactNode;
}

function PaginationButton({
  onClick,
  ariaLabel,
  disabled,
  label,
}: PaginationButtonProps) {
  return (
    <button
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-slate-200 disabled:bg-green-500 disabled:text-white"
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

PaginationButton.defaultProps = {
  disabled: false,
};

export default PaginationButton;
