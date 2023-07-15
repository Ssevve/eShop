import cx from 'classnames';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  'primary-outline': 'bg-white hover:bg-green-50 border border-primary text-primary',
  neutral: 'bg-gray-100 hover:bg-gray-200',
  danger: 'bg-danger text-white hover:bg-red-600',
  'danger-outline': 'bg-white hover:bg-red-50 border border-danger text-danger',
};

export interface AsLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  renderAs: React.ElementType;
  to: string;
  type?: never;
  disabled?: never;
}

interface AsButtonProps extends React.ComponentProps<'button'> {
  renderAs?: never;
  to?: never;
  type?: 'submit' | 'button';
}

export type ButtonProps = {
  variant?: keyof typeof variants;
  disabled?: boolean;
  evenPadding?: boolean;
  fullWidth?: boolean;
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
} & (AsLinkProps | AsButtonProps);

function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  evenPadding = false,
  textSize = 'base',
  type = 'button',
  renderAs: Component = 'button',
  className,
  to,
  ...props
}: ButtonProps) {
  const buttonType = Component === 'button' ? type : undefined;

  return (
    <Component
      className={cx(
        'flex items-center justify-center gap-4 rounded-sm uppercase',
        `text-${textSize}`,
        fullWidth ? 'w-full' : 'w-max',
        evenPadding ? 'p-3' : 'px-6 py-3',
        variants[variant],
        className
      )}
      type={buttonType}
      to={to}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
