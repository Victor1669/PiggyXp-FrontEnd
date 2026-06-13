import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { router, usePathname } from "expo-router";

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

const SHEET_HEIGHT = 300;

export function useHomeSheet() {
  const pathName = usePathname();
  const [disableButton, setDisableButton] = useState(false);

  const { setShowSheet } = useShowSheet();
  const { selectedLevelIndex, levels } = useLevels();
  const selectedLevel = levels[selectedLevelIndex];
  const pan = useRef(new Animated.ValueXY({ x: 0, y: SHEET_HEIGHT })).current;

  function startLevel() {
    if (disableButton) return;
    setDisableButton(true);

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

  return {
    selectedLevel,
    disableButton,
    startLevel,
    SHEET_HEIGHT,
    animatedValue: pan,
  };
}
