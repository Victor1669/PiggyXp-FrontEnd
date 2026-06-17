export function textFormatter(text: any) {
  const data = typeof text === "string" ? JSON.parse(text) : text;
  const fullText = data.card[0];

  const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [];

  const mid = Math.ceil(sentences.length / 2);

  const string1 = sentences.slice(0, mid).join(" ");
  const string2 = sentences.slice(mid).join(" ");

  return [string1, string2];
}
