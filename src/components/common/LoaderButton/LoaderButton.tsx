import { AsLinkProps, Button, ButtonProps } from '@/components/common/Button';
import { ThreeDots } from 'react-loader-spinner';

type LoaderButtonProps = {
  isLoading: boolean;
  type?: 'submit' | 'button';
  loaderHeight?: number;
  loaderWidth?: number;
} & Exclude<ButtonProps, AsLinkProps>;

export function LoaderButton({
  children,
  isLoading,
  loaderHeight = 24,
  loaderWidth = 30,
  type = 'button',
  ...props
}: LoaderButtonProps) {
  return (
    <Button
      type={type}
      aria-label={isLoading ? 'Loading' : undefined}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ThreeDots height={loaderHeight} width={loaderWidth} color="#fff" /> : children}
    </Button>
  );
}
