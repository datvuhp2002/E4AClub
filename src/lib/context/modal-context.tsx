"use client";

import { createContext, useContext, useState } from "react";
import useModal from "../hooks/useModal";
import Modal from "@/modules/common/components/modal";
const ModalContext = createContext({});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { showModal, setShowModal, configModal, HandleOpenModal } = useModal();

  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal, configModal, HandleOpenModal }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): any => useContext(ModalContext);
