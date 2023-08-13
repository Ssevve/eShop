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
        className="fixed left-1/2 top-1/2 z-50 max-h-[95%] w-[95%] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden"
      >
        <div className="relative flex h-full w-full flex-col justify-between rounded-sm bg-white px-4 py-8 shadow">
          <header className="flex items-center justify-between">
            <h3 className="font-semibold uppercase text-gray-400">{title}</h3>
            <CloseMenuButton close={close} />
          </header>
          <section className="mt-8 ">{children}</section>
        </div>
      </div>
    </div>
  );
}
