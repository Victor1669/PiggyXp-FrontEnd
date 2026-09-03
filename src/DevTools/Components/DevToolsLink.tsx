import { Link } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { colors, showDevTools } = AppConfig;

export default function DevToolsLink() {
  if (showDevTools)
    return (
      <Link
        style={{
          position: "absolute",
          right: 0,
          marginTop: 50,
          marginRight: 30,
          backgroundColor: colors.splashBackColor,
          mixBlendMode: "difference",
          padding: 15,
          borderRadius: 5,
        }}
        href="/DevTools"
      >
        DevTools
      </Link>
    );
}
