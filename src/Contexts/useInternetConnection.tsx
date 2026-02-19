import { createContext, useContext } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

import { toastMessage } from "Utils/toast";

interface InternetConnectionData {
  getIsConnected: () => boolean;
}

const InternetConnectionContext = createContext<InternetConnectionData>(
  {} as InternetConnectionData,
);

export function InternetConnectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const netInfo = useNetInfo();

  const isConnected =
    netInfo.isConnected === true && netInfo.isInternetReachable === true;

  function getIsConnected() {
    if (!isConnected) {
      toastMessage({
        type: "error",
        text: "Conecte-se à Internet para continuar!",
      });
      return false;
    }
    return true;
  }

  return (
    <InternetConnectionContext.Provider value={{ getIsConnected }}>
      {children}
    </InternetConnectionContext.Provider>
  );
}

export function useInternetConnection(): InternetConnectionData {
  const context = useContext(InternetConnectionContext);

  if (!context) {
    throw new Error(
      "InternetConnectionContext usado fora do InternetConnectionProvider!",
    );
  }

  return context;
}
