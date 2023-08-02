import { AsLinkProps, Button, ButtonProps } from '@/components/common/Button';
import { ThreeDots } from 'react-loader-spinner';

type LoaderButtonProps = {
  isLoading: boolean;
  type?: 'submit' | 'button';
} & Exclude<ButtonProps, AsLinkProps>;

export function LoaderButton({
  children,
  isLoading,
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
      {isLoading ? <ThreeDots height={24} width={30} color="#fff" /> : children}
    </Button>
  );
}
