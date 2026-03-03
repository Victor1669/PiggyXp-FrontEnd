import { useState, createContext, useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";
import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

import { Animate } from "Utils/animate";

export interface DynamicScrollContextData {
  isScrolling: boolean;
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>;
  navBarHeight: Animated.Value;
}

// Interface para o Provider
export interface DynamicScrollProviderProps {
  children: React.ReactNode;
}

export const DynamicScrollContext = createContext<
  DynamicScrollContextData | undefined
>(undefined);

export const DynamicScrollProvider: React.FC<DynamicScrollProviderProps> = ({
  children,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const navBarHeight = useRef(new Animated.Value(30)).current;

  //const navBarHeight = isScrolling ? 0 : 30;

  useEffect(() => {
    if (isScrolling) {
      NavigationBar.setVisibilityAsync("hidden");
      Animate({ animatedValue: navBarHeight, duration: 100, toValue: 0 });
    } else {
      NavigationBar.setVisibilityAsync("visible");
      StatusBar.setStatusBarHidden(false, "slide");
      Animate({ animatedValue: navBarHeight, duration: 100, toValue: 30 });
    }
  }, [isScrolling]);

  return (
    <DynamicScrollContext.Provider
      value={{ isScrolling, setIsScrolling, navBarHeight }}
    >
      {children}
    </DynamicScrollContext.Provider>
  );
};

export const useDynamicScroll = (): DynamicScrollContextData => {
  const context = useContext(DynamicScrollContext);

  if (!context) {
    throw new Error("useDynamicScroll usado fora do DynamicScrollProvider!");
  }

  return context;
};
