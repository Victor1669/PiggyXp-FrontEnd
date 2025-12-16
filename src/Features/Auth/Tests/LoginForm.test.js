import { render, screen } from "@testing-library/react-native";
import LoginForm from "../Components/LoginForm";

describe("LoginForm", () => {
  it("Deve renderizar", () => {
    render(<LoginForm />);

    const TesteText = screen.getByText("Teste");

    expect(TesteText).toBeTruthy();
  });
});
