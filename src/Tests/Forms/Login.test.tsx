import { render } from "@testing-library/react-native";

import { loginApi } from "@Services/loginApi";

import { fetchApi } from "@Utils/fetchApi";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { StatusProvider } from "Contexts/StatusContext";

import { fieldValidations, FieldName } from "../Helpers/fieldValidations";

import { submitInputAndExpectError } from "../Helpers/submitInputAndExpectError";

import Login from "@App/Login";

jest.mock("@Utils/fetchApi");
const mockfetchApi = fetchApi as jest.MockedFunction<typeof fetchApi>;

const userData = { email: "usuario@email.com", password: "senha123" };

const renderLogin = () =>
  render(
    <AuthProvider>
      <StatusProvider>
        <Login />
      </StatusProvider>
    </AuthProvider>,
  );

describe("LoginForm & loginApi", () => {
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

  describe("Serviço de Autenticação (loginApi)", () => {
    const setupFetchMock = (data: object, status = 200) => {
      mockfetchApi.mockResolvedValueOnce({
        status,
        success: status < 300,
        data: data as any,
      });
    };

    it("deve chamar a API com os parâmetros de login corretos", async () => {
      setupFetchMock({ token: "fake" });
      await loginApi(userData);

      expect(mockfetchApi).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "post",
          route: "login",
          body: userData,
        }),
      );
    });

    it("deve retornar os dados em caso de sucesso", async () => {
      const successData = { token: "t1", refreshToken: "r1", message: "Ok" };
      setupFetchMock(successData);

      const result = await loginApi(userData);
      expect(result.data).toEqual(successData);
    });

    it("deve retornar o erro quando as credenciais falham", async () => {
      const errorData = { error: "Incorreto" };
      setupFetchMock(errorData, 401);

      const result = await loginApi(userData);
      expect(result.data).toEqual(errorData);
    });

    it("deve lançar exceção em caso de erro crítico de rede", async () => {
      mockfetchApi.mockRejectedValueOnce(new Error("Network Error"));
      await expect(loginApi(userData)).rejects.toThrow("Network Error");
    });
  });
});
