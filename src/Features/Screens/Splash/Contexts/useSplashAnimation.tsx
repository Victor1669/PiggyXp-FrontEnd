import R, { createContext, useContext, useRef, useState } from "react";
import { StackAnimationTypes } from "react-native-screens";

import { randomNumber } from "Utils/randomNumber";

import { SplashAnimation1 } from "../Animations/SplashAnimation1";
import { SplashAnimation2 } from "../Animations/SplashAnimation2";
import { SplashAnimation3 } from "../Animations/SplashAnimation3";
import { SplashAnimation4 } from "../Animations/SplashAnimation4";
import { SplashAnimation5 } from "../Animations/SplashAnimation5";
import { SplashAnimation6 } from "../Animations/SplashAnimation6";
import { SplashAnimation7 } from "../Animations/SplashAnimation7";

import { AnimationFunction } from "../Types/SplashAnimationsType";

interface SplashAnimationProviderValues {
  pickedAnimation: AnimationFunction;
  layoutAnimation: StackAnimationTypes;
  setLayoutAnimation: R.Dispatch<R.SetStateAction<StackAnimationTypes>>;
  animationIndex: number;
  animationDuration: number;
}

const SplashAnimationContext = createContext<
  SplashAnimationProviderValues | undefined
>(undefined);

function SplashAnimationProvider({ children }: { children: R.ReactNode }) {
  const animations: AnimationFunction[] = [
    SplashAnimation1,
    SplashAnimation2,
    SplashAnimation3,
    SplashAnimation4,
    SplashAnimation5,
    SplashAnimation6,
    SplashAnimation7,
  ];

  const animationIndex = useRef(randomNumber(0, animations.length - 1)).current;
  //const animationIndex = 2;
  const pickedAnimation = animations[animationIndex];

  const [layoutAnimation, setLayoutAnimation] = useState<StackAnimationTypes>(
    pickedAnimation.initialValues.animationType || "fade",
  );
  const animationDuration =
    pickedAnimation.initialValues.animationDuration || 2800;

  const value: SplashAnimationProviderValues = {
    pickedAnimation,
    layoutAnimation,
    setLayoutAnimation,
    animationIndex,
    animationDuration,
  };

  return (
    <SplashAnimationContext.Provider value={value}>
      {children}
    </SplashAnimationContext.Provider>
  );
}

export default function useSplashAnimation() {
  const context = useContext(SplashAnimationContext);

  if (context === undefined) {
    throw new Error(
      "SplashAnimationContext usado fora do SplashAnimationProvider!",
    );
  }

  return context;
}

export { useSplashAnimation, SplashAnimationProvider };
