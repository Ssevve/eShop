import cx from 'classnames';

interface ButtonDefaultProps {
  ariaLabel?: string;
  variant?: 'primary' | 'neutral';
  evenPadding?: boolean;
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

function Button({
  children,
  evenPadding = false,
  onClick,
  ariaLabel = undefined,
  textSize = 'base',
  variant = 'primary',
}: ButtonProps) {
  const textSizeClass = `text-${textSize}`;
  const paddingClasses = evenPadding ? 'p-3' : 'px-6 py-3';
  const colorVariants = {
    primary: 'bg-primary-green text-white hover:bg-green-700',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  };

  return (
    <button
      aria-label={ariaLabel}
      className={`flex items-center justify-center gap-4 rounded-sm uppercase ${paddingClasses} ${colorVariants[variant]} ${textSizeClass}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
