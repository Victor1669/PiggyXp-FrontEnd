import * as SystemUI from "expo-system-ui";
import * as NavigationBar from "expo-navigation-bar";
import * as StatusBar from "expo-status-bar";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

export async function themeChanger(theme: "splash" | "dark" | "light") {
  if (theme === "splash") {
    StatusBar.setStatusBarBackgroundColor(colors.splashBackColor);
    StatusBar.setStatusBarStyle("dark");
    NavigationBar.setStyle("dark");
    SystemUI.setBackgroundColorAsync(colors.splashBackColor);
  } else if (theme === "dark") {
    StatusBar.setStatusBarBackgroundColor(colors.contentBackColor.Dark);
    StatusBar.setStatusBarStyle("light");
    SystemUI.setBackgroundColorAsync(colors.contentBackColor.Dark);
  }
}
