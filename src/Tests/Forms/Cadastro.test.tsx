import { render } from "@testing-library/react-native";

import { cadastroApi } from "@Services/cadastroApi";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { StatusProvider } from "Contexts/StatusContext";

import { submitInputAndExpectError } from "../Helpers/submitInputAndExpectError";
import { fieldValidations, FieldName } from "../Helpers/fieldValidations";

import Cadastro from "@App/Cadastro";

jest.mock("@Services/cadastroApi");
const mockcadastroApi = cadastroApi as jest.MockedFunction<typeof cadastroApi>;

const registrationData = {
  Nome: "Victor",
  Email: "victor@email.com",
  Senha: "senha123",
};

const renderCadastro = () =>
  render(
    <AuthProvider>
      <StatusProvider>
        <Cadastro />
      </StatusProvider>
    </AuthProvider>,
  );

describe("CadastroForm & cadastroApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Interface do Cadastro", () => {
    it("deve renderizar a tela corretamente", async () => {
      const { findByText } = renderCadastro();
      expect(await findByText("Já tem uma conta?")).toBeTruthy();
    });

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

  describe("Serviço de Cadastro (cadastroApi)", () => {
    const setupRegisterMock = (data: object, status: number) => {
      mockcadastroApi.mockResolvedValueOnce({
        status,
        success: status < 300,
        data: data as any,
      });
    };

    it("deve processar o cadastro com sucesso", async () => {
      const successData = {
        message: "Usuário cadastrado com sucesso!",
        token: "token_abc",
      };
      setupRegisterMock(successData, 201);

      const result = await cadastroApi({
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

      const result = await cadastroApi({
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

      const result = await cadastroApi({
        name: "VictorExistente",
        email: "novo@email.com",
        password: "123",
      });

      expect(result.status).toBe(500);
      expect(result.data.message).toBe("Nome de usuário já existente");
    });

    it("deve falhar se houver erro de conexão ou exceção", async () => {
      mockcadastroApi.mockRejectedValueOnce(new Error("Falha na API"));

      await expect(cadastroApi(registrationData as any)).rejects.toThrow(
        "Falha na API",
      );
    });
  });
});
