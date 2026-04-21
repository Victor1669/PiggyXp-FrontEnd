import { Link } from "expo-router";

import { GlobalColors } from "Assets/Colors";

export default function DevToolsLink() {
  return (
    <Link
      style={{
        position: "absolute",
        right: 0,
        marginTop: 50,
        marginRight: 30,
        backgroundColor: GlobalColors.splashBackColor,
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
