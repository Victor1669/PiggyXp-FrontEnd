import { createContext, useState, useContext } from "react";

type ShowModalType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowModalContext = createContext<ShowModalType | undefined>(undefined);

export function ShowModalProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <ShowModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ShowModalContext.Provider>
  );
}

export function useShowModal() {
  const context = useContext(ShowModalContext);

  if (context === undefined) {
    throw new Error("ShowModalContext usado fora do ShowModalProvider!");
  }

  return context;
}
