import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLevels } from "../Contexts/useLevels";
import { useShowSheet } from "../Contexts/useShowSheet";

import { useHomeSheet } from "../Hooks/useHomeSheet";

import BottomSheet from "@Components/BottomSheet/BottomSheet";
import Paragraph from "@Components/Paragraph";
import Button from "@Components/Button";

export default function HomeSheet() {
  const { selectedLevel, disableButton, startLevel, animatedValue } =
    useHomeSheet();

  const { levels, unitTitle } = useLevels();

  return (
    <HomeSheetContainer animatedValue={animatedValue}>
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
          onPress={startLevel}
        >
          Iniciar
        </Button>
      </View>
    </HomeSheetContainer>
  );
}

function HomeSheetContainer({
  children,
  animatedValue,
}: {
  children: React.ReactNode;
  animatedValue: Animated.ValueXY;
}) {
  const insets = useSafeAreaInsets();

  const { showSheet, setShowSheet } = useShowSheet();
  const { SHEET_HEIGHT } = useHomeSheet();

  const STYLES = {
    paddingHorizontal: 20,
    marginBottom: 10,
  };

  return (
    <BottomSheet
      height={SHEET_HEIGHT}
      yPosition={animatedValue}
      showSheet={showSheet}
      setShowSheet={setShowSheet}
      startSheetTop={SHEET_HEIGHT}
      finalSheetTop={insets.bottom - 35}
      style={STYLES}
    >
      {children}
    </BottomSheet>
  );
}
