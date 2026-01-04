import { render, screen } from "@testing-library/react-native";

import { AuthProvider } from "../Contexts/useAuth";

import CadastroForm from "../Components/CadastroForm";

describe("LoginForm", () => {
  it("Deve renderizar", () => {
    render(
      <AuthProvider>
        <CadastroForm />
      </AuthProvider>
    );

    const TesteText = screen.getByText("Criar conta com");

    expect(TesteText).toBeTruthy();
  });
});
