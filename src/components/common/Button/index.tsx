import cx from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'neutral';
  evenPadding?: boolean;
  fullWidth?: boolean;
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
  to?: string;
}

function Button({
  children,
  as: Component = 'button',
  variant = 'primary',
  fullWidth = false,
  evenPadding = false,
  textSize = 'base',
  to,
  ...rest
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  };

  return (
    <Component
      to={to}
      className={cx(
        'flex items-center justify-center gap-4 rounded-sm uppercase',
        `text-${textSize}`,
        fullWidth ? 'w-full' : 'w-max',
        evenPadding ? 'p-3' : 'px-6 py-3',
        variants[variant]
      )}
      type="button"
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Button;
