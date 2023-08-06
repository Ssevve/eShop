import { AsLinkProps, Button, ButtonProps } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { current } from 'tailwindcss/colors';

type LoaderButtonProps = {
  isLoading: boolean;
  type?: 'submit' | 'button';
  loaderHeight?: number;
  loaderWidth?: number;
} & Exclude<ButtonProps, AsLinkProps>;

export function LoaderButton({
  children,
  isLoading,
  loaderHeight = 26,
  loaderWidth = 28,
  type = 'button',
  ...props
}: LoaderButtonProps) {
  return (
    <Button type={type} {...props}>
      {isLoading ? <Loader height={loaderHeight} width={loaderWidth} color={current} /> : children}
    </Button>
  );
}
