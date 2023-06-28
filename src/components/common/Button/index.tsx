import cx from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'neutral';
  fullWidth?: boolean;
  evenPadding?: boolean;
  as?: React.ElementType;
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
  ariaLabel?: string;
  to?: string;
  onClick?: () => void;
}

function Button({
  children,
  as = 'button',
  variant = 'primary',
  fullWidth = false,
  evenPadding = false,
  textSize = 'base',
  to,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const textSizeClass = `text-${textSize}`;
  const paddingClasses = evenPadding ? 'p-3' : 'px-6 py-3';
  const colorVariants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  };

  const As = as;
  return (
    <As
      to={to}
      aria-label={ariaLabel}
      className={cx(
        `flex items-center justify-center gap-4 rounded-sm uppercase ${paddingClasses} ${colorVariants[variant]} ${textSizeClass}`,
        fullWidth ? 'w-full' : 'w-max'
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </As>
  );
}

export default Button;
