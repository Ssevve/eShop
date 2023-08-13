import { TfiClose } from 'react-icons/tfi';

interface CloseMenuButtonProps
  extends Omit<React.ComponentProps<'button'>, 'className' | 'onClick'> {
  close: () => void;
}

export function CloseMenuButton({ close, ...props }: CloseMenuButtonProps) {
  return (
    <button
      aria-label="Close"
      type="button"
      className={'rounded-sm p-1.5 text-gray-400 hover:bg-gray-200 hover:text-dark'}
      onClick={close}
      {...props}
    >
      <TfiClose size={16} strokeWidth={2} />
    </button>
  );
}
