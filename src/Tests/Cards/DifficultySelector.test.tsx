import {
  render,
  waitFor,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react-native";

jest.mock("@Services/changeDifficultyApi", () => ({
  changeDifficultyApi: jest.fn(),
}));

jest.mock("Contexts/useInternetConnection", () => ({
  useInternetConnection: jest.fn(),
}));

jest.mock("Features/Auth/Contexts/useAuth", () => ({
  ...jest.requireActual("@Auth/Contexts/useAuth"),
  useAuth: () => ({
    setUser: mockSetUser,
  }),
}));

jest.mock("Hooks/useAutoSlider", () => ({
  useAutoSlider: () => {
    const { useState } = require("react");
    const [currentIndex, setCurrentIndex] = useState(0);

    return {
      flatListRef: { current: null },
      currentIndex,
      isUserInteracting: false,
      handleUserInteractionStart: jest.fn(),
      handleScrollEnd: (index: number) => setCurrentIndex(index),
    };
  },
}));

jest.mock("Utils/securestore", () => ({
  ...jest.requireActual("Utils/securestore"),
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn().mockResolvedValue(undefined),
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
import { getStorageItem, STORAGE_KEYS } from "Utils/securestore";

import { changeDifficultyApi } from "../../Services/changeDifficultyApi";

import DifficultySelector from "@App/Login/DifficultySelector";

import { swipeToCard } from "../Helpers/swipeToCard";
import { expectDots } from "../Helpers/expectDots";

const mockSetUser = jest.fn();
const mockShowStatus = jest.fn();
const mockHideStatus = jest.fn();

const TOTAL_CARDS = 3;

async function renderDifficultySelector() {
  const renderResult = render(
    <AuthProvider>
      <StatusProvider>
        <DifficultySelector />
      </StatusProvider>
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
    (getStorageItem as jest.Mock).mockImplementation((key: string) => {
      if (key === STORAGE_KEYS.userToken) return Promise.resolve();
      return Promise.resolve(null);
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
    (changeDifficultyApi as jest.Mock).mockResolvedValue({
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
      expect(changeDifficultyApi).toHaveBeenCalledWith({ difficulty: 1 });
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
      expect(changeDifficultyApi).not.toHaveBeenCalled();
      expect(mockShowStatus).toHaveBeenCalledWith("noInternet");
    });
  });
});
