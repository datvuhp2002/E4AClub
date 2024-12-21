import React, { useState } from "react";
interface IConfigModal {
  title: String;
  body: React.ReactNode;
  footer: React.ReactNode;
  width: Number;
}
const useModal = () => {
  let [showModal, setShowModal] = useState(false);
  let [configModal, setConfigModal] = useState<IConfigModal>({
    title: "",
    body: null,
    footer: null,
    width: 50,
  });

  let HandleOpenModal = (config: IConfigModal) => {
    setShowModal(true);
    setConfigModal(config);
  };
  const HandleCloseModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    setShowModal,
    configModal,
    HandleOpenModal,
    HandleCloseModal,
  };
};

export default useModal;
