import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { usePathname } from "expo-router";

import { LivesService } from "Features/Level/Services/LevelServices";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import HomeHeader from "./Layout/HomeHeader";
import HomeSlider from "./Layout/HomeSlider";
import HomeContent from "./Layout/HomeContent";

import ContentSheet from "./Components/HomeSheet";

export default function HomeContainer() {
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

  return (
    <View style={HomeStyles.container}>
      <HomeHeader />
      <HomeSlider />
      <HomeContent />
      <ContentSheet />
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
