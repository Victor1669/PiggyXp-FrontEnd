import { fireEvent } from "@testing-library/react-native";
import {
  TextMatch,
  TextMatchOptions,
} from "@testing-library/react-native/build/matches";
import {
  FindByQuery,
  GetByQuery,
} from "@testing-library/react-native/build/queries/make-queries";
import { CommonQueryOptions } from "@testing-library/react-native/build/queries/options";

export async function submitInputAndExpectError(
  getByTestId: GetByQuery<TextMatch, CommonQueryOptions & TextMatchOptions>,
  findByTestId: FindByQuery<TextMatch, CommonQueryOptions & TextMatchOptions>,
  inputId: string,
  inputValue: string,
  expectedError: string,
) {
  fireEvent.changeText(getByTestId(inputId), inputValue);

  fireEvent.press(getByTestId("submit-button"));

  const errorElement = await findByTestId(`${inputId}-Error`);

  expect(errorElement).toHaveTextContent(expectedError);
}
