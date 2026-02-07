import { render, screen } from "@testing-library/react-native";

import { AuthProvider } from "@UseAuth";

import { submitInputAndExpectError } from "@Services/jest";

import Cadastro from "@App/Cadastro";

describe("CadastroForm", () => {
  it("Renderizar", async () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>,
    );

    const titleText = screen.findByText("Cadastro");

    expect(titleText).toBeTruthy();
  });
  it("Validar o campo de nome do Cadastro", async () => {
    const { getByTestId, findByTestId } = render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>,
    );

    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Nome",
      "",
      "O nome é obrigatório",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Nome",
      "tes",
      "O nome deve possuir no mínimo 4 caracteres",
    );
  });
  it("Validar o campo de email do Cadastro", async () => {
    const { getByTestId, findByTestId } = render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>,
    );

    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Email",
      "",
      "O email é obrigatório",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Email",
      "test",
      "Email inválido",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Email",
      "test.com",
      "Email inválido",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Email",
      "@gmail.com",
      "Email inválido",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Email",
      "test@gmail.com",
      "",
    );
  });
  it("Validar o campo de senha do Cadastro", async () => {
    const { getByTestId, findByTestId } = render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>,
    );

    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Senha",
      "",
      "A senha é obrigatória",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Senha",
      "teste",
      "A senha deve possuir no mínimo 6 caracteres",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Senha",
      "testeteste",
      "A senha deve conter ao menos um caractere especial",
    );
    await submitInputAndExpectError(
      getByTestId,
      findByTestId,
      "Senha",
      "testeteste@.",
      "A senha deve conter letras minúsculas e maiúsculas",
    );
  });
});
