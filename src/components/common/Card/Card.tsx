import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        'rounded-sm border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}
