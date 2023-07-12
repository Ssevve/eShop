import cx from 'classnames';

interface AsLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  renderAs: React.ElementType;
  to: string;
  type?: never;
  disabled?: never;
}

interface AsButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  renderAs?: never;
  to?: never;
  type?: 'submit' | 'button';
}

export type ButtonProps = {
  variant?: 'primary' | 'neutral';
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
  to,
  ...rest
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  };

  const buttonType = Component === 'button' ? type : undefined;

  return (
    <Component
      className={cx(
        'flex items-center justify-center gap-4 rounded-sm uppercase',
        `text-${textSize}`,
        fullWidth ? 'w-full' : 'w-max',
        evenPadding ? 'p-3' : 'px-6 py-3',
        variants[variant]
      )}
      type={buttonType}
      to={to}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Button;
