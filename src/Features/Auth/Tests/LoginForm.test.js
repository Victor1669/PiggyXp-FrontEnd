import { render, screen } from "@testing-library/react-native";

import { AuthProvider } from "../Contexts/useAuth";

import LoginForm from "../Components/LoginForm";

describe("LoginForm", () => {
  it("Deve renderizar", () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    const TesteText = screen.getByText("Logar com");

    expect(TesteText).toBeTruthy();
  });
});
