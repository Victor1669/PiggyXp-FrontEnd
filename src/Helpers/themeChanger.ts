import * as SystemUI from "expo-system-ui";
import * as NavigationBar from "expo-navigation-bar";
import * as StatusBar from "expo-status-bar";

import { GlobalColors } from "@Assets/Colors";

export async function themeChanger(theme: "splash" | "dark" | "light") {
  if (theme === "splash") {
    StatusBar.setStatusBarBackgroundColor(GlobalColors.splashBackColor);
    StatusBar.setStatusBarStyle("dark");
    NavigationBar.setStyle("dark");
    SystemUI.setBackgroundColorAsync(GlobalColors.splashBackColor);
  } else if (theme === "dark") {
    StatusBar.setStatusBarBackgroundColor(GlobalColors.contentBackColor.Dark);
    StatusBar.setStatusBarStyle("light");
    SystemUI.setBackgroundColorAsync(GlobalColors.contentBackColor.Dark);
  }
}
