export function getPathDirection(
  index: number,
  actualPosition: string | undefined,
  nextPosition: string | undefined,
): "left" | "right" {
  if (index === 0) return "left";
  if (nextPosition === "flex-start") return "left";
  if (nextPosition === "flex-end") return "right";
  if (actualPosition === "flex-start") return "right";
  if (actualPosition === "flex-end") return "left";
  return "right";
}
