import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import BottomSheet from "@Components/BottomSheet/BottomSheet";
import Paragraph from "@Components/Paragraph";
import Button from "@Components/Button";

const SHEET_HEIGHT = 300;

export default function ContentSheet() {
  const pathName = usePathname();
  const { showSheet, setShowSheet } = useShowSheet();
  const { selectedLevelIndex, levels, unitTitle } = useLevels();
  const insets = useSafeAreaInsets();
  const [disableButton, setDisableButton] = useState(false);

  const selectedLevel = levels[selectedLevelIndex];

  const pan = useRef(new Animated.ValueXY({ x: 0, y: SHEET_HEIGHT })).current;

  const STYLES = {
    paddingHorizontal: 20,
    marginBottom: 10,
  };

  function handleButtonPress() {
    router.push(
      `/Level/LoadingLevel/?actualQuestion=${selectedLevelIndex + 1}`,
    );
  }

  useEffect(() => {
    if (pathName !== "/Content") {
      setShowSheet(false);
      Animated.spring(pan, {
        toValue: { y: SHEET_HEIGHT, x: 0 },
        useNativeDriver: true,
      }).start();
    }
  }, [pathName]);

  useEffect(() => {
    return () => {
      setDisableButton(false);
    };
  }, [pathName]);

  return (
    <BottomSheet
      height={SHEET_HEIGHT}
      yPosition={pan}
      showSheet={showSheet}
      setShowSheet={setShowSheet}
      startSheetTop={SHEET_HEIGHT}
      finalSheetTop={insets.bottom - 35}
      style={STYLES}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <View style={{ gap: 5 }}>
          <Paragraph fontSize="normal" textAlign="left" fontFamily="madimiOne">
            {unitTitle}
          </Paragraph>
          <Paragraph fontSize="big" textAlign="left" fontFamily="madimiOne">
            Título teste
          </Paragraph>
          <Paragraph fontSize="small" textAlign="left" fontFamily="madimiOne">
            Lição {selectedLevel?.id} de {levels.length}
          </Paragraph>
        </View>

        <Button
          disabled={disableButton}
          style={{ margin: "auto" }}
          onPress={() => {
            if (disableButton) return;
            setDisableButton(true);
            handleButtonPress();
          }}
        >
          Iniciar
        </Button>
      </View>
    </BottomSheet>
  );
}
