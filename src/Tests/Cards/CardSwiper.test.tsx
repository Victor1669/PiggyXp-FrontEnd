import { render } from "@testing-library/react-native";

import { swipeToCard } from "./swipeToCard";
import SwiperContainer from "@Screens/Swiper/SwiperContainer";

import type { GetByQuery } from "@testing-library/react-native/build/queries/make-queries";

const DOTS_COLORS = {
  active: "#fff",
  inactive: "#000",
} as const;

const swipeScenarios = [
  { label: "primeiro", swipes: [], activeIndex: 0 },
  { label: "segundo", swipes: [1], activeIndex: 1 },
  { label: "terceiro", swipes: [1, 2], activeIndex: 2 },
];

const TOTAL_CARDS = 3;

describe("SwiperContainer", () => {
  it("Renderizar", async () => {
    const { findByText } = render(<SwiperContainer />);
    expect(await findByText("Aprender é transformar.")).toBeTruthy();
  });

  swipeScenarios.forEach(({ label, swipes, activeIndex }) => {
    it(`Deve exibir o ${label} card`, () => {
      const { getByTestId } = render(<SwiperContainer />);

      swipes.forEach((index) =>
        swipeToCard(getByTestId, "SwiperContainer", index),
      );

      expectDots(getByTestId, activeIndex, TOTAL_CARDS);
    });
  });
});

function expectDots(
  getByTestId: GetByQuery<string, never>,
  activeIndex: number,
  total: number,
) {
  return Array.from({ length: total }, (_, i) => {
    expect(getByTestId(`dot-${i}`)).toHaveStyle({
      backgroundColor:
        i === activeIndex ? DOTS_COLORS.active : DOTS_COLORS.inactive,
    });
  });
}
