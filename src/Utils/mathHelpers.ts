import { Dimensions } from "react-native";

export function calcLivesTimer(reset_lives_at: string) {
  const resetTime = new Date(reset_lives_at);
  const now = new Date();

  if (now.getTime() >= resetTime.getTime()) return null;

  const diffMs = resetTime.getTime() - now.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

export function normalize(size: number) {
  const phoneWindow = Dimensions.get("window");
  const deviceWidth = phoneWindow.width;

  const BASE_WIDTH = 390;
  const scale = deviceWidth / BASE_WIDTH;

  return Math.round(size * scale);
}

export function generateRandomNumber(min: number = 0, max: number = min + 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
