import { createContext, useState, useContext } from "react";

type ShowLoadingScreenType = {
  showLoadingScreen: boolean;
  setShowLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowLoadingScreenContext = createContext<
  ShowLoadingScreenType | undefined
>(undefined);

export function ShowLoadingScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);

  return (
    <ShowLoadingScreenContext.Provider
      value={{ showLoadingScreen, setShowLoadingScreen }}
    >
      {children}
    </ShowLoadingScreenContext.Provider>
  );
}

export function useShowLoadingScreen() {
  const context = useContext(ShowLoadingScreenContext);

  if (context === undefined) {
    throw new Error(
      "ShowLoadingScreenContext usado fora do ShowLoadingScreenProvider!",
    );
  }

  return context;
}
