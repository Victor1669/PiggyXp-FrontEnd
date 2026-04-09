/**
 * Gera um número inteiro aleatório entre min e max (inclusive).
 * @param min - O menor valor possível.
 * @param max - O maior valor possível.
 */
export function randomNumber(min: number = 0, max: number = min + 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
