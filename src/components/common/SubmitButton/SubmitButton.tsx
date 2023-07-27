import { AsLinkProps, Button, ButtonProps } from '@/components/common/Button';
import { ThreeDots } from 'react-loader-spinner';

type SubmitButtonProps = {
  isLoading: boolean;
} & Exclude<ButtonProps, AsLinkProps>;

export function SubmitButton({ children, isLoading, ...props }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      aria-label={isLoading ? 'Loading' : undefined}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ThreeDots height={24} width={30} color="#fff" /> : children}
    </Button>
  );
}
