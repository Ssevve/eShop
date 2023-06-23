import { ThreeDots } from 'react-loader-spinner';

interface SubmitButtonProps {
  text: string;
  isLoading: boolean;
}

function SubmitButton({ text, isLoading }: SubmitButtonProps) {
  return (
    <button
      className="flex justify-center rounded-sm border border-primary bg-primary p-2 font-bold text-white transition duration-75 ease-out hover:border-primary hover:bg-primary hover:ease-in"
      type="submit"
      aria-label={isLoading ? 'Loading' : ''}
      disabled={isLoading}
    >
      {isLoading ? <ThreeDots height={24} width={30} color="#fff" /> : text}
    </button>
  );
}

export default SubmitButton;
