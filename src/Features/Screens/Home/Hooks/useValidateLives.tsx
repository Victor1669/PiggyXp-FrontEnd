import { useEffect, useState } from "react";
import { usePathname } from "expo-router";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { LivesService } from "Features/Level/Services/LevelServices";

export function useValidateLives() {
  const { temporaryErrorCount, userToken } = useStorageItemsContext();
  const updateUserInfo = useUpdateUserInfo();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function verificarSeUsuarioSaiu() {
      setIsLoading(true);

      const [errorCount, storedUserToken] = await Promise.all([
        temporaryErrorCount.get(),
        userToken.get(),
      ]);

      if (errorCount.length) {
        await LivesService(storedUserToken, { erro: +errorCount });

        temporaryErrorCount.delete();
      }
      await updateUserInfo();

      setIsLoading(false);
    }

    if (pathname === "/Content") verificarSeUsuarioSaiu();
  }, [pathname]);

  return { isLoading };
}
