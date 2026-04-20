export function getByPosition<T>(
  first: T,
  second: T,
  third: T,
  position: 1 | 2 | 3,
): T {
  const map = { 1: first, 2: second, 3: third };
  return map[position];
}
