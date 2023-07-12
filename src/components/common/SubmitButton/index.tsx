import { ThreeDots } from 'react-loader-spinner';
import Button, { ButtonProps } from '../Button';

type SubmitButtonProps = {
  isLoading: boolean;
} & ButtonProps;

function SubmitButton({ children, isLoading, ...rest }: SubmitButtonProps) {
  return (
    <Button type="submit" aria-label={isLoading ? 'Loading' : undefined} disabled={isLoading}>
      {isLoading ? <ThreeDots height={24} width={30} color="#fff" /> : children}
    </Button>
  );
}

export default SubmitButton;
