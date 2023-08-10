interface UpdateAmountTriggerProps {
  disabled: boolean;
  shouldRender: boolean;
  onClick: () => void;
}

export function UpdateAmountTrigger({ disabled, shouldRender, onClick }: UpdateAmountTriggerProps) {
  return shouldRender ? (
    <button
      disabled={disabled}
      onClick={onClick}
      className="absolute bottom-full mb-1 w-full text-center text-xs uppercase text-primary hover:underline"
    >
      Update
    </button>
  ) : null;
}
