import { Backdrop } from '@/components/common/Backdrop';
import { CloseMenuButton } from '@/components/common/CloseMenuButton';
import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export interface ModalProps {
  close: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ close, title, children }: ModalProps) {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, close);

  return (
    <div>
      <Backdrop />
      <div
        ref={modalRef}
        className="fixed left-0 top-0 z-50 h-[95%] w-[95%] xs:left-1/2 xs:top-1/2 xs:-translate-x-1/2 xs:-translate-y-1/2 sm:h-max sm:max-w-xl"
      >
        <div className="relative flex h-full w-full flex-col justify-between rounded-sm bg-white p-4 shadow sm:p-8">
          <header className="flex items-center justify-between">
            <h3 className="font-semibold uppercase text-gray-400">{title}</h3>
            <CloseMenuButton close={close} />
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
