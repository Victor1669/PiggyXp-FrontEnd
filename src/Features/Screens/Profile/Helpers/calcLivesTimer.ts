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
