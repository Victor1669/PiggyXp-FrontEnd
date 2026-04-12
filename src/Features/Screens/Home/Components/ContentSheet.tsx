import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import BottomSheet from "@Components/BottomSheet/BottomSheet";
import Paragraph from "@Components/Paragraph";

export default function ContentSheet() {
  const pathName = usePathname();
  const { showSheet, setShowSheet } = useShowSheet();
  const { selectedLevelIndex } = useLevels();
  const insets = useSafeAreaInsets();

  const SHEET_HEIGHT = 300;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: SHEET_HEIGHT })).current;

  const STYLES = {
    bottom: SHEET_HEIGHT - SHEET_HEIGHT,
    paddingHorizontal: 20,
    marginBottom: 10,
  };

  function handleButtonPress() {
    router.push(
      `/Level/LoadingLevel/?actualQuestion=${selectedLevelIndex + 1}`,
    );
  }

  useEffect(() => {
    // SE A ROTA MUDAR, ELE VOLTA PRA FALSE
    if (pathName !== "/Content") {
      setShowSheet(false);
      Animated.spring(pan, {
        toValue: { y: SHEET_HEIGHT, x: 0 },
        useNativeDriver: true,
      }).start();
    }
  }, [pathName]);

  return (
    <BottomSheet
      height={SHEET_HEIGHT}
      yPosition={pan}
      showSheet={showSheet}
      setShowSheet={setShowSheet}
      startSheetTop={SHEET_HEIGHT}
      finalSheetTop={insets.bottom - 35}
      buttonText="Iniciar"
      style={STYLES}
      onButtonPress={handleButtonPress}
      textElements={<TextElements />}
    />
  );
}

function TextElements() {
  const { selectedLevelIndex, levels, title } = useLevels();

  const selectedLevel = levels[selectedLevelIndex];

  return (
    <View style={{ gap: 5 }}>
      <Paragraph fontSize="normal" textAlign="left" fontFamily="madimiOne">
        {title}
      </Paragraph>
      <Paragraph fontSize="big" textAlign="left" fontFamily="madimiOne">
        Título teste
      </Paragraph>
      <Paragraph fontSize="small" textAlign="left" fontFamily="madimiOne">
        Lição {selectedLevel?.id} de {levels.length}
      </Paragraph>
    </View>
  );
}
