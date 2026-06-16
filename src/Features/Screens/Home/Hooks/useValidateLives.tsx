import { useEffect } from "react";
import { usePathname } from "expo-router";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { LivesService } from "Features/Level/Services/LevelServices";

export function useValidateLives() {
  const { temporaryErrorCount, userToken } = useStorageItemsContext();
  const updateUserInfo = useUpdateUserInfo();

  const pathname = usePathname();

  useEffect(() => {
    async function verificarSeUsuarioSaiu() {
      const [errorCount, storedUserToken] = await Promise.all([
        temporaryErrorCount.get(),
        userToken.get(),
      ]);

      if (errorCount.length) {
        await LivesService(storedUserToken, { erro: +errorCount });

        temporaryErrorCount.delete();
      }
      await atualizarInformacoesDoUsuario();
    }

    async function atualizarInformacoesDoUsuario() {
      await updateUserInfo();
    }

    if (pathname === "/Content") verificarSeUsuarioSaiu();
  }, [pathname]);
}
