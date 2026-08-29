import { useEffect, useState } from "react";
import { usePathname } from "expo-router";

import {
  STORAGE_KEYS,
  deleteStorageItem,
  getStorageItem,
} from "Utils/securestore";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { LivesService } from "Features/Level/Services/LevelServices";

export function useValidateLives() {
  const updateUserInfo = useUpdateUserInfo();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pathname !== "/Content") return;

    setIsLoading(true);

    Promise.all([
      getStorageItem(STORAGE_KEYS.temporaryErrorCount),
      getStorageItem(STORAGE_KEYS.userToken),
    ])
      .then(async ([errorCount, storedUserToken]) => {
        if (errorCount && storedUserToken) {
          await LivesService(storedUserToken, {
            erro: Number(errorCount),
          });

          await deleteStorageItem(STORAGE_KEYS.temporaryErrorCount);
        }

        await updateUserInfo();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pathname]);

  return { isLoading };
}
