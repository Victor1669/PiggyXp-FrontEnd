import { render, screen } from "@testing-library/react-native";
import { AuthProvider } from "../Contexts/useAuth";

import Login from "../../../../app/Login";

describe("LoginForm", () => {
  it("Deve renderizar", async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const testeText = await screen.findByText("Logar com");
    expect(testeText).toBeTruthy();
  });
});
