import { Dimensions } from "react-native";

import { fireEvent } from "@testing-library/react-native";
import { GetByQuery } from "@testing-library/react-native/build/queries/make-queries";

export const swipeToCard = (
  getByTestId: GetByQuery<string, never>,
  testId: string,
  index: number,
) => {
  const screenWidth = Dimensions.get("screen").width;

  fireEvent(getByTestId(testId), "scroll", {
    nativeEvent: {
      contentOffset: { x: screenWidth * index, y: 0 },
      contentSize: { width: screenWidth, height: 0 },
      layoutMeasurement: { width: screenWidth, height: 0 },
    },
  });
};
