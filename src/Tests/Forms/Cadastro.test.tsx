import { render } from "@testing-library/react-native";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { ShowLoadingScreenProvider } from "Contexts/useShowLoadingScreen";

import { UserRegister } from "@Auth/Services/CadastroService";

import { submitInputAndExpectError } from "./submitInputAndExpectError";
import { fieldValidations, FieldName } from "./fieldValidations";
import Cadastro from "@App/Cadastro";

jest.mock("@Auth/Services/CadastroService");
const mockUserRegister = UserRegister as jest.MockedFunction<
  typeof UserRegister
>;

const registrationData = {
  Nome: "Victor",
  Email: "victor@email.com",
  Senha: "senha123",
};

const renderCadastro = () =>
  render(
    <AuthProvider>
      <ShowLoadingScreenProvider>
        <Cadastro />
      </ShowLoadingScreenProvider>
    </AuthProvider>,
  );

describe("CadastroForm & UserRegister", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Interface do Cadastro", () => {
    it("deve renderizar a tela corretamente", async () => {
      const { findByText } = renderCadastro();
      expect(await findByText("Já tem uma conta?")).toBeTruthy();
    });

    // VALIDAÇÃO DE CAMPOS
    const fields: FieldName[] = ["Nome", "Email", "Senha"];
    fields.forEach((field) => {
      it(`deve validar o campo de ${field}`, async () => {
        const { getByTestId, findByTestId } = renderCadastro();
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

  describe("Serviço de Cadastro (UserRegister)", () => {
    const setupRegisterMock = (data: object, status: number) => {
      mockUserRegister.mockResolvedValueOnce({ data, status });
    };

    it("deve processar o cadastro com sucesso", async () => {
      const successData = {
        message: "Usuário cadastrado com sucesso!",
        token: "token_abc",
      };
      setupRegisterMock(successData, 201);

      const result = await UserRegister({
        name: registrationData.Nome,
        email: registrationData.Email,
        password: registrationData.Senha,
      });

      expect(result.status).toBeLessThan(300);
      expect(result.data).toEqual(successData);
    });

    it("deve tratar erro de email já cadastrado (Status 500)", async () => {
      const errorData = { message: "Email já cadastrado!" };
      setupRegisterMock(errorData, 500);

      const result = await UserRegister({
        name: "Victor",
        email: "repetido@email.com",
        password: "123",
      });

      expect(result.status).toBe(500);
      expect(result.data.message).toBe("Email já cadastrado!");
    });

    it("deve tratar erro de nome de usuário existente (Status 500)", async () => {
      const errorData = { message: "Nome de usuário já existente" };
      setupRegisterMock(errorData, 500);

      const result = await UserRegister({
        name: "VictorExistente",
        email: "novo@email.com",
        password: "123",
      });

      expect(result.status).toBe(500);
      expect(result.data.message).toBe("Nome de usuário já existente");
    });

    it("deve falhar se houver erro de conexão ou exceção", async () => {
      mockUserRegister.mockRejectedValueOnce(new Error("Falha na API"));

      await expect(UserRegister(registrationData as any)).rejects.toThrow(
        "Falha na API",
      );
    });
  });
});
