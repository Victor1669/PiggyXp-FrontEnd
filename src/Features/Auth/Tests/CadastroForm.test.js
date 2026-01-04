import { render, screen } from "@testing-library/react-native";
import CadastroForm from "../Components/CadastroForm";

describe("LoginForm", () => {
  it("Deve renderizar", () => {
    render(<CadastroForm />);

    const TesteText = screen.getByText("Criar Conta");

    expect(TesteText).toBeTruthy();
  });
});
