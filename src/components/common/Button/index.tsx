import cx from 'classnames';

interface ButtonDefaultProps {
  ariaLabel?: string;
  textSize?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
}

interface ButtonProps extends ButtonDefaultProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, ariaLabel, textSize = 'base', onClick }: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cx(
        `flex items-center justify-center gap-4 rounded-sm bg-primary-green px-6 py-2 uppercase text-white hover:bg-green-700 text-${textSize}`
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
