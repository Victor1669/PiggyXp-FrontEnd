import { createContext, useContext, useState } from "react";

interface ShowSheetContextData {
  showSheet: boolean;
  setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowSheetContext = createContext<ShowSheetContextData>(
  {} as ShowSheetContextData,
);

export function ShowSheetProvider({ children }: { children: React.ReactNode }) {
  const [showSheet, setShowSheet] = useState<boolean>(false);

  return (
    <ShowSheetContext.Provider value={{ showSheet, setShowSheet }}>
      {children}
    </ShowSheetContext.Provider>
  );
}

export const useShowSheet = (): ShowSheetContextData => {
  const context = useContext(ShowSheetContext);

  if (!context) {
    throw new Error("useShowSheet usado fora do ShowSheetProvider!");
  }

  return context;
};
