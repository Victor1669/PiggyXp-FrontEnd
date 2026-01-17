import { render, screen } from "@testing-library/react-native";

import { AuthProvider } from "../Contexts/useAuth";

import Cadastro from "../../../../app/Cadastro";

describe("CadastroForm", () => {
  it("Deve renderizar", async () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    );

    const TesteText = screen.findByText("Criar conta com");

    expect(TesteText).toBeTruthy();
  });
});
