import { render, screen } from "@testing-library/react-native";

import { AuthProvider } from "../Contexts/useAuth";

import CadastroForm from "../Components/CadastroForm";

describe("CadastroForm", () => {
  it("Deve renderizar", async () => {
    render(
      <AuthProvider>
        <CadastroForm />
      </AuthProvider>
    );

    const TesteText = screen.findByText("Criar conta com");

    expect(TesteText).toBeTruthy();
  });
});
