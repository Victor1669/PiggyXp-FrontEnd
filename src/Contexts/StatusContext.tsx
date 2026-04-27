import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipos de modais disponíveis
export type ModalType =
  | "gameOver"
  | "noInternet"
  | "loading"
  | "confirmExit"
  | null;

interface StatusContextData {
  modalType: ModalType;
  isVisible: boolean;
  showStatus: (type: ModalType) => void;
  hideStatus: () => void;
}

const StatusContext = createContext<StatusContextData | undefined>(undefined);

function StatusProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isVisible, setIsVisible] = useState(false);

  function showStatus(type: ModalType) {
    setModalType(type);
    setIsVisible(true);
  }

  function hideStatus() {
    setIsVisible(false);
    setTimeout(() => setModalType(null), 300);
  }

  return (
    <StatusContext.Provider
      value={{ modalType, isVisible, showStatus, hideStatus }}
    >
      {children}
    </StatusContext.Provider>
  );
}

function useStatus() {
  const context = useContext(StatusContext);
  if (!context)
    throw new Error("useStatus deve ser usado dentro de um StatusProvider");
  return context;
}

export { StatusProvider, useStatus };
