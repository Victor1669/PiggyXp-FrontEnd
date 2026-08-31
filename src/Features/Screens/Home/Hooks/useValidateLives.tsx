import { useEffect, useState } from "react";
import { usePathname } from "expo-router";

import {
  STORAGE_KEYS,
  deleteStorageItem,
  getStorageItem,
} from "Utils/securestore";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { livesApi } from "Services/levelServices";

export function useValidateLives() {
  const updateUserInfo = useUpdateUserInfo();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pathname !== "/Content") return;

    setIsLoading(true);

    getStorageItem(STORAGE_KEYS.temporaryErrorCount)
      .then(async (errorCount) => {
        if (errorCount) {
          await livesApi({
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
