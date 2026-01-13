import { render, screen } from "@testing-library/react-native";
import { AuthProvider } from "../Contexts/useAuth";
import LoginForm from "../Components/LoginForm";

describe("LoginForm", () => {
  it("Deve renderizar", async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    const testeText = await screen.findByText("Logar com");
    expect(testeText).toBeTruthy();
  });
});
