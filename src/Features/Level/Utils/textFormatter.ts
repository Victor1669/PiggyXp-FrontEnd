export function textFormatter(text: string) {
  const parts = text.split(". ").map((s) => s.replace(/\.$/, "").trim() + ".");

  return parts;
}
