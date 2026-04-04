import { render } from "@testing-library/react-native";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { ShowLoadingScreenProvider } from "Contexts/useShowLoadingScreen";

import { useFetch } from "@Auth/Hooks/useFetch";
import { fieldValidations, FieldName } from "./fieldValidations";

import { submitInputAndExpectError } from "./submitInputAndExpectError";

import { UserLogin } from "@Auth/Services/LoginService";

import Login from "@App/Login";

jest.mock("@Auth/Hooks/useFetch");
const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

const userData = { email: "usuario@email.com", password: "senha123" };

console.log("AuthProvider:", AuthProvider);
console.log("ShowLoadingScreenProvider:", ShowLoadingScreenProvider);
console.log("Login:", Login);

const renderLogin = () =>
  render(
    <AuthProvider>
      <ShowLoadingScreenProvider>
        <Login />
      </ShowLoadingScreenProvider>
    </AuthProvider>,
  );

describe("LoginForm & UserLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Interface do Login", () => {
    it("deve renderizar a tela corretamente", async () => {
      const { findByText } = renderLogin();
      expect(await findByText("Esqueceu a senha?")).toBeTruthy();
    });

    const fields: FieldName[] = ["Email", "Senha"];
    fields.forEach((field) => {
      it(`deve validar o campo de ${field}`, async () => {
        const { getByTestId, findByTestId } = renderLogin();
        for (const { value, error } of fieldValidations[field]) {
          await submitInputAndExpectError(
            getByTestId,
            findByTestId,
            field,
            value,
            error,
          );
        }
      });
    });
  });

  describe("Serviço de Autenticação (UserLogin)", () => {
    const setupFetchMock = (data: object, status = 200) => {
      mockUseFetch.mockResolvedValueOnce({ status, data });
    };

    it("deve chamar a API com os parâmetros de login corretos", async () => {
      setupFetchMock({ token: "fake" });
      await UserLogin(userData);

      expect(mockUseFetch).toHaveBeenCalledWith({
        method: "post",
        rota: "login",
        body: userData,
        showToastMessage: true,
      });
    });

    it("deve retornar os dados em caso de sucesso", async () => {
      const successData = { token: "t1", refreshToken: "r1", message: "Ok" };
      setupFetchMock(successData);

      const result = await UserLogin(userData);
      expect(result.data).toEqual(successData);
    });

    it("deve retornar o erro quando as credenciais falham", async () => {
      const errorData = { error: "Incorreto" };
      setupFetchMock(errorData, 401);

      const result = await UserLogin(userData);
      expect(result.data).toEqual(errorData);
    });

    it("deve lançar exceção em caso de erro crítico de rede", async () => {
      mockUseFetch.mockRejectedValueOnce(new Error("Network Error"));
      await expect(UserLogin(userData)).rejects.toThrow("Network Error");
    });
  });
});
