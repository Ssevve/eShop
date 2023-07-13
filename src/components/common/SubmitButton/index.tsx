import { ThreeDots } from 'react-loader-spinner';
import Button, { AsLinkProps, ButtonProps } from '../Button';

type SubmitButtonProps = {
  isLoading: boolean;
} & Exclude<ButtonProps, AsLinkProps>;

function SubmitButton({ children, isLoading, ...props }: SubmitButtonProps) {
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

export default SubmitButton;
