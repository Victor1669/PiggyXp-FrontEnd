import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
//import { Platform } from "react-native";

interface AuthProviderTypes {
  children: React.ReactNode;
}

type AuthProviderValues = {
  user: any;
  login: (newUser: object) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthProviderValues | undefined>(undefined);

/**
 * Provider para disponibilizar ações com o usuário atual.
 */
function AuthProvider({ children }: AuthProviderTypes) {
  const [user, setUser] = useState<object>({});

  async function login(newUser: object) {
    if (Platform.OS === "web") return;
    await SecureStore.setItemAsync("user", JSON.stringify(newUser));
    setUser(newUser);
  }

  async function logout() {
    await SecureStore.deleteItemAsync("user");
    setUser({});
  }

  useEffect(() => {
    async function carregarDados() {
      if (Platform.OS === "web") return;
      const storedUser = (await SecureStore.getItemAsync("user")) ?? "";

      setUser(storedUser.length ? JSON.parse(storedUser) : {});
    }
    carregarDados();
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook para o usuário poder acessar os dados do contexto de autenticação.
 */
function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext usado fora do AuthProvider!");

  return context;
}

export { AuthProvider, useAuth };
