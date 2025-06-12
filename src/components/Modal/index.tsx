import { Modal as FRModal, ModalBody, ModalHeader } from "flowbite-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  return (
    <>
      <FRModal show={isOpen} onClose={onClose} size="xl">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </FRModal>
    </>
  );
}
