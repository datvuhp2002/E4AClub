interface ModalProps {
  showModal: boolean;
  configModal: {
    title: string;
    body: React.ReactNode;
    footer: React.ReactNode;
    width: number;
  };
  onClose: () => void;
}
