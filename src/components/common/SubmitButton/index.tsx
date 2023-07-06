import { ThreeDots } from 'react-loader-spinner';
import Button, { ButtonProps } from '../Button';

interface SubmitButtonProps extends ButtonProps {
  isLoading: boolean;
}

function SubmitButton({ isLoading, children, ...rest }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      aria-label={isLoading ? 'Loading' : undefined}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <ThreeDots height={24} width={30} color="#fff" /> : children}
    </Button>
  );
}

export default SubmitButton;
