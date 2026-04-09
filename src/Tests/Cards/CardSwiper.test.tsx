import { render, cleanup, act, fireEvent } from "@testing-library/react-native";
import { swipeToCard } from "../Helpers/swipeToCard";
import SwiperContainer from "@Screens/Swiper/SwiperContainer";
import { expectDots } from "../Helpers/expectDots";
import { SplashAnimationProvider } from "Features/Screens/Splash/Contexts/useSplashAnimation";

const swipeScenarios = [
  { label: "primeiro", swipes: [], activeIndex: 0 },
  { label: "segundo", swipes: [1], activeIndex: 1 },
  { label: "terceiro", swipes: [1, 2], activeIndex: 2 },
];

const TOTAL_CARDS = 3;

const renderSwiperContainer = () =>
  render(
    <SplashAnimationProvider>
      <SwiperContainer />
    </SplashAnimationProvider>,
  );

describe("SwiperContainer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    cleanup();
  });

  it("Renderizar", async () => {
    const { findByText } = renderSwiperContainer();
    expect(await findByText("Aprender é transformar.")).toBeTruthy();
  });

  swipeScenarios.forEach(({ label, swipes, activeIndex }) => {
    it(`Deve exibir o ${label} card`, () => {
      const { getByTestId } = renderSwiperContainer();
      const swiper = getByTestId("SwiperContainer");

      act(() => {
        fireEvent(swiper, "touchStart");
      });

      swipes.forEach((index) => {
        act(() => {
          swipeToCard(getByTestId, "SwiperContainer", index);
        });
      });

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expectDots(getByTestId, activeIndex, TOTAL_CARDS);
    });
  });
});
