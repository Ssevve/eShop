import { twMerge } from 'tailwind-merge';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  'primary-outline': 'bg-white hover:bg-green-50 border border-primary text-primary',
  neutral: 'bg-gray-100 hover:bg-gray-200',
  'neutral-outline': 'bg-white hover:bg-gray-50 border border-gray-200',
  danger: 'bg-danger text-white hover:bg-red-600',
  'danger-outline': 'bg-white hover:bg-red-50 border border-danger text-danger',
};

export type ButtonVariant = keyof typeof variants;

const sizes = {
  sm: {
    paddingX: 3,
    paddingY: 1.5,
    textSize: 'xs',
  },
  base: {
    paddingX: 6,
    paddingY: 3,
    textSize: 'base',
  },
};

type ButtonSize = keyof typeof sizes;

const textSizes = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
] as const;

type ButtonTextSize = (typeof textSizes)[number];

export interface AsLinkProps extends Omit<React.ComponentProps<'a'>, 'href'> {
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
  variant?: ButtonVariant;
  disabled?: boolean;
  evenPadding?: boolean;
  fullWidth?: boolean;
  size?: ButtonSize;
  textSize?: ButtonTextSize;
} & (AsLinkProps | AsButtonProps);

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  evenPadding = false,
  size = 'base',
  textSize,
  type = 'button',
  renderAs: Component = 'button',
  className,
  to,
  ...props
}: ButtonProps) {
  const buttonType = Component === 'button' ? type : undefined;

  return (
    <Component
      className={twMerge(
        'flex w-max items-center justify-center gap-4 rounded-sm uppercase',
        textSize ? `text-${textSize}` : `text-${sizes[size].textSize}`,
        fullWidth && 'w-full',
        evenPadding
          ? `p-${sizes[size].paddingY}`
          : `px-${sizes[size].paddingX} py-${sizes[size].paddingY}`,
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
