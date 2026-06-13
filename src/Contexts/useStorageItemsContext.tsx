import { createContext, useContext } from "react";

import { JWTStoreItem, StoreItem } from "Helpers/StoreItem";

interface StorageItemsContextValues {
  clearStorage: () => Promise<void>;
  userEmailWhileRecovering: StoreItem;
  temporaryImageToken: StoreItem;
  updateMissionDay: StoreItem;
  userUnit: StoreItem;
  userInfo: StoreItem;
  temporaryErrorCount: StoreItem;
  refreshToken: JWTStoreItem;
  userToken: JWTStoreItem;
}

const StorageItemsContext = createContext<
  StorageItemsContextValues | undefined
>(undefined);

function StorageItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userEmailWhileRecovering = new StoreItem("RECOVERY_EMAIL");
  const temporaryImageToken = new StoreItem("TEMPORARY_IMAGE_TOKEN");
  const updateMissionDay = new StoreItem("UPDATE_MISSION_DAY");
  const userUnit = new StoreItem("USER_UNIT");
  const userInfo = new StoreItem("USER_INFO");
  const temporaryErrorCount = new StoreItem("TEMPORARY_ERROR_COUNT");

  const userToken = new JWTStoreItem("USER_TOKEN");
  const refreshToken = new JWTStoreItem("REFRESH_TOKEN");

  async function clearStorage() {
    const allUserInfo = [
      userEmailWhileRecovering,
      temporaryImageToken,
      updateMissionDay,
      userUnit,
      userInfo,
      temporaryErrorCount,
      refreshToken,
      userToken,
    ];

    allUserInfo.forEach(async (storeItem) => {
      await storeItem.delete();
    });
  }

  const value: StorageItemsContextValues = {
    clearStorage,
    userEmailWhileRecovering,
    temporaryImageToken,
    updateMissionDay,
    userUnit,
    userInfo,
    temporaryErrorCount,
    refreshToken,
    userToken,
  };

  return (
    <StorageItemsContext.Provider value={value}>
      {children}
    </StorageItemsContext.Provider>
  );
}

function useStorageItemsContext() {
  const context = useContext(StorageItemsContext);

  if (context === undefined) {
    throw new Error(
      "StorageItemsContext usado fora de StorageItemsContextProvider!",
    );
  }

  return context;
}

export { StorageItemsContextProvider, useStorageItemsContext };
