import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import BottomSheet from "@Components/BottomSheet/BottomSheet";
import Paragraph from "@Components/Paragraph";

export default function ContentSheet({ sections }: { sections: any[] }) {
  const pathName = usePathname();
  const { showSheet, setShowSheet } = useShowSheet();
  const { selectedLevelIndex, levels } = useLevels();
  const insets = useSafeAreaInsets();

  const SHEET_HEIGHT = 300;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: SHEET_HEIGHT })).current;

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

  const selectedLevel = levels[selectedLevelIndex];

  return (
    <BottomSheet
      height={SHEET_HEIGHT}
      yPosition={pan}
      showSheet={showSheet}
      setShowSheet={setShowSheet}
      startSheetTop={SHEET_HEIGHT}
      finalSheetTop={insets.bottom - 35}
      buttonText="Iniciar"
      style={{
        bottom: SHEET_HEIGHT * sections.length - SHEET_HEIGHT,
        paddingHorizontal: 20,
        marginBottom: 10,
      }}
      onButtonPress={() => {
        router.push(
          `/Level/LoadingLevel/?actualQuestion=${selectedLevelIndex + 1}`,
        );
      }}
      textElements={
        <View style={{ gap: 5 }}>
          <Paragraph fontSize="normal" textAlign="left" fontFamily="madimiOne">
            {sections[0].title}
          </Paragraph>
          <Paragraph fontSize="big" textAlign="left" fontFamily="madimiOne">
            {selectedLevel.title}
          </Paragraph>
          <Paragraph fontSize="small" textAlign="left" fontFamily="madimiOne">
            Lição {selectedLevel.id} de {levels.length}
          </Paragraph>
        </View>
      }
    />
  );
}
