import { GetByQuery } from "@testing-library/react-native/build/queries/make-queries";

const DOTS_COLORS = {
  active: "#fff",
  inactive: "#000",
} as const;

export function expectDots(
  getByTestId: GetByQuery<string, never>,
  activeIndex: number,
  total: number,
) {
  return Array.from({ length: total }, (_, i) => {
    const dot = getByTestId(`dot-${i}`);
    expect(dot).toHaveStyle({
      backgroundColor:
        i === activeIndex ? DOTS_COLORS.active : DOTS_COLORS.inactive,
    });
  });
}
