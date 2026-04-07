//#region Mocks e importações
import {
  render,
  waitFor,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react-native";

jest.mock("@Auth/Services/DifficultyService", () => ({
  DifficultyService: jest.fn(),
}));

jest.mock("Contexts/useInternetConnection", () => ({
  useInternetConnection: jest.fn(),
}));

jest.mock("../../Features/Auth/Contexts/useAuth", () => ({
  ...jest.requireActual("@Auth/Contexts/useAuth"),
  useAuth: () => ({
    setUser: mockSetUser,
    userToken: { get: jest.fn().mockResolvedValue("token") },
  }),
}));

jest.mock("Contexts/useShowLoadingScreen", () => ({
  ...jest.requireActual("Contexts/useShowLoadingScreen"),
  useShowLoadingScreen: () => ({
    setShowLoadingScreen: mockSetShowLoadingScreen,
  }),
}));

import { AuthProvider } from "../../Features/Auth/Contexts/useAuth";
import { ShowLoadingScreenProvider } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { DifficultyService } from "../../Features/Auth/Services/DifficultyService";

import DifficultySelector from "@App/Login/DifficultySelector";

import { swipeToCard } from "../Helpers/swipeToCard";
import { expectDots } from "../Helpers/expectDots";

const mockSetUser = jest.fn();
const mockSetShowLoadingScreen = jest.fn();
//#endregion

const TOTAL_CARDS = 3;

async function renderDifficultySelector() {
  const renderResult = render(
    <AuthProvider>
      <ShowLoadingScreenProvider>
        <DifficultySelector />
      </ShowLoadingScreenProvider>
    </AuthProvider>,
  );

  await waitFor(() => {
    renderResult.getByText("Continuar");
  });

  return renderResult;
}

describe("DifficultySelectorContainer - Seleção de dificuldade", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useInternetConnection as jest.Mock).mockReturnValue({
      getIsConnected: () => true,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("deve atualizar os dots ao realizar swipe", async () => {
    const { getByTestId } = await renderDifficultySelector();

    expectDots(getByTestId, 0, TOTAL_CARDS);

    act(() => {
      swipeToCard(getByTestId, "CardSwiper", 1);
    });
    expectDots(getByTestId, 1, TOTAL_CARDS);

    act(() => {
      swipeToCard(getByTestId, "CardSwiper", 2);
    });
    expectDots(getByTestId, 2, TOTAL_CARDS);
  });

  it("deve definir a dificuldade com sucesso", async () => {
    (DifficultyService as jest.Mock).mockResolvedValue({
      data: { message: "Dificuldade definida com sucesso!" },
      status: 200,
    });

    const { getByText, getByTestId } = await renderDifficultySelector();

    act(() => {
      swipeToCard(getByTestId, "CardSwiper", 1);
    });

    await act(async () => {
      fireEvent.press(getByText("Continuar"));
    });

    await waitFor(() => {
      expect(DifficultyService).toHaveBeenCalledWith(
        { difficulty: 1 },
        "token",
      );
      expect(mockSetUser).toHaveBeenCalled();
    });
  });

  it("não deve chamar a API se não houver conexão", async () => {
    (useInternetConnection as jest.Mock).mockReturnValue({
      getIsConnected: () => false,
    });

    const { getByText } = await renderDifficultySelector();

    fireEvent.press(getByText("Continuar"));

    await waitFor(() => {
      expect(DifficultyService).not.toHaveBeenCalled();
    });
  });
});
