import { Button, ButtonVariant } from '@/components/common/Button';
import { Modal, ModalProps } from '@/components/common/Modal';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

interface ConfirmationModalProps extends Omit<ModalProps, 'title'> {
  confirmVariant?: ButtonVariant;
  confirmText: string;
  confirmCallback: () => void;
}

export function ConfirmationModal({
  close,
  confirmVariant = 'primary',
  confirmText,
  confirmCallback,
  children,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    close();
    confirmCallback();
  };

  return (
    <Modal close={close}>
      <section className="flex flex-col items-center justify-center gap-4">
        <AiOutlineExclamationCircle className="text-gray-300" size={80} aria-hidden="true" />
        {children}
      </section>
      <section className="mt-8 flex justify-center gap-4">
        <Button variant={confirmVariant} onClick={handleConfirm}>
          {confirmText}
        </Button>
        <Button variant="neutral" onClick={close}>
          Cancel
        </Button>
      </section>
    </Modal>
  );
}
