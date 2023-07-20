import theme from '@/lib/theme';
import { ThreeDots } from 'react-loader-spinner';

interface LoaderProps {
  height?: number;
  width?: number;
  className?: string;
}

function Loader({ height = 48, width = 60, className }: LoaderProps) {
  return (
    <div className={`mx-auto flex w-full grow flex-col items-center justify-center ${className}`}>
      <ThreeDots
        ariaLabel="Loading"
        height={height}
        width={width}
        color={theme.colors['primary']}
      />
    </div>
  );
}

export default Loader;
