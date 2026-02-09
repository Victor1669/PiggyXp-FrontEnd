import { render, screen } from "@testing-library/react-native";

import { AuthProvider } from "@Auth/Contexts/useAuth";

import { submitInputAndExpectError } from "Utils/jest";

import Login from "@App/Login";

describe("LoginForm", () => {
  it("Renderizar", async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>,
    );

    const titleText = await screen.findByText("Entrar");

    expect(titleText).toBeTruthy();
  });
  it("Validar o campo de email do Login", async () => {
    const { getByTestId, findByTestId } = render(
      <AuthProvider>
        <Login />
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
  it("Validar o campo de senha do login", async () => {
    const { getByTestId, findByTestId } = render(
      <AuthProvider>
        <Login />
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
