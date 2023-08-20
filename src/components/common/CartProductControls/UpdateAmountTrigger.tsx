interface UpdateAmountTriggerProps {
  disabled: boolean;
  onClick: () => void;
}

export function UpdateAmountTrigger({ disabled, onClick }: UpdateAmountTriggerProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="absolute bottom-full mb-1 w-full text-center text-xs uppercase text-primary hover:underline"
    >
      Update
    </button>
  );
}
