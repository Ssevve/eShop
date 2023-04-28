interface PaginationButtonBaseProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function PaginationButtonBase({
  onClick,
  ariaLabel,
  children,
  disabled,
}: PaginationButtonBaseProps) {
  return (
    <button
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-slate-200 disabled:bg-green-500 disabled:text-white"
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

PaginationButtonBase.defaultProps = {
  disabled: false,
};

export default PaginationButtonBase;
