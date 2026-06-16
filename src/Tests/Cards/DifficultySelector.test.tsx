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
  }),
}));

jest.mock("Contexts/useStorageItemsContext", () => ({
  ...jest.requireActual("Contexts/useStorageItemsContext"),
  useStorageItemsContext: () => ({
    userInfo: {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
    },
    userUnit: {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
    },
    userToken: {
      get: jest.fn().mockResolvedValue("token-falso"),
    },
    clearStorage: jest.fn(),
  }),
}));

jest.mock("Contexts/StatusContext", () => ({
  ...jest.requireActual("Contexts/StatusContext"),
  useStatus: () => ({
    showStatus: mockShowStatus,
    hideStatus: mockHideStatus,
  }),
}));

import { AuthProvider } from "../../Features/Auth/Contexts/useAuth";
import { StatusProvider } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { StorageItemsContextProvider } from "Contexts/useStorageItemsContext";

import { setDifficultyApi } from "../../Features/Select-Difficulty/setDifficultyApi";

import DifficultySelector from "@App/Login/DifficultySelector";

import { swipeToCard } from "../Helpers/swipeToCard";
import { expectDots } from "../Helpers/expectDots";

const mockSetUser = jest.fn();
const mockShowStatus = jest.fn();
const mockHideStatus = jest.fn();
//#endregion

const TOTAL_CARDS = 3;

async function renderDifficultySelector() {
  const renderResult = render(
    <StorageItemsContextProvider>
      <AuthProvider>
        <StatusProvider>
          <DifficultySelector />
        </StatusProvider>
      </AuthProvider>
    </StorageItemsContextProvider>,
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
    (setDifficultyApi as jest.Mock).mockResolvedValue({
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
      expect(setDifficultyApi).toHaveBeenCalledWith(
        { difficulty: 1 },
        "token-falso",
      );
      expect(mockSetUser).toHaveBeenCalled();
      expect(mockShowStatus).toHaveBeenCalledWith("loading");
      expect(mockHideStatus).toHaveBeenCalled();
    });
  });

  it("não deve chamar a API se não houver conexão", async () => {
    (useInternetConnection as jest.Mock).mockReturnValue({
      getIsConnected: () => false,
    });

    const { getByText } = await renderDifficultySelector();

    fireEvent.press(getByText("Continuar"));

    await waitFor(() => {
      expect(setDifficultyApi).not.toHaveBeenCalled();
      expect(mockShowStatus).toHaveBeenCalledWith("noInternet");
    });
  });
});
