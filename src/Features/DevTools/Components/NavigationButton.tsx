import { router } from "expo-router";

import Button from "Components/Button";

export default function NavigationButton() {
  return <Button onPress={() => router.push("/_sitemap")}>Navegar</Button>;
}
