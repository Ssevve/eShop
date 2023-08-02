import theme from '@/lib/theme';
import { ThreeDots } from 'react-loader-spinner';
import { twMerge } from 'tailwind-merge';

interface LoaderProps {
  height?: number;
  width?: number;
  className?: string;
  color?: string;
}

export function Loader({ height = 48, width = 60, color, className }: LoaderProps) {
  return (
    <div className={twMerge(`mx-auto flex w-full flex-col items-center justify-center`, className)}>
      <ThreeDots
        ariaLabel="Loading"
        height={height}
        width={width}
        color={color || theme.colors['primary']}
      />
    </div>
  );
}
