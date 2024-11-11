"use client";

import { createContext, useContext } from "react";
import useToast from "../hooks/useToast";
import Toast from "@/modules/common/components/toast";
const ToastContext = createContext({});

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { showToast, setShowToast, configToast, HandleOpenToast } = useToast();

  return (
    <ToastContext.Provider
      value={{ showToast, setShowToast, configToast, HandleOpenToast }}
    >
      <Toast />
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): any => useContext(ToastContext);
