import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { jwtDecode, JwtPayload } from "jwt-decode";

import {
  deleteSecureStoreItem,
  getSecureStoreItem,
  setSecureStoreItem,
} from "Utils/securestore";

interface AuthProviderTypes {
  children: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
}

type AuthProviderValues = {
  user: any;
  login: (userData: object) => Promise<void>;
  logout: () => Promise<void>;
  updateTemporaryImageToken: (token: string) => Promise<void>;
  getTemporaryImageToken: () => Promise<string>;
  decodeUserDataToken: (token: string) => Promise<any>;
  getUserToken: () => Promise<string>;
};

const AuthContext = createContext<AuthProviderValues | undefined>(undefined);

/**
 * Provider para disponibilizar ações com o usuário atual.
 */
function AuthProvider({ children }: AuthProviderTypes) {
  const [user, setUser] = useState<object>({});

  async function login(userData: object) {
    if (Platform.OS === "web") return;

    await setSecureStoreItem({
      itemName: "USER",
      newValue: JSON.stringify(userData),
    });

    setUser(userData);
  }

  async function logout() {
    await deleteSecureStoreItem({ itemName: "USER" });
    setUser({});
  }

  async function updateTemporaryImageToken(token: string) {
    await setSecureStoreItem({
      itemName: "TEMPORARY_IMAGE_TOKEN",
      newValue: token,
    });
  }

  async function getTemporaryImageToken() {
    return await getSecureStoreItem({ itemName: "TEMPORARY_IMAGE_TOKEN" });
  }

  async function decodeUserDataToken(token: string) {
    await setSecureStoreItem({ itemName: "USER_TOKEN", newValue: token });
    return jwtDecode(token);
  }

  async function getUserToken() {
    const token = await getSecureStoreItem({ itemName: "USER_TOKEN" });

    return token;
  }

  useEffect(() => {
    async function getUserInfoFromStore() {
      if (Platform.OS === "web") return;
      const storedUser = await getSecureStoreItem({ itemName: "USER" });

      setUser(storedUser.length ? JSON.parse(storedUser) : {});
    }
    getUserInfoFromStore();
  }, []);

  const value: AuthProviderValues = {
    user,
    login,
    logout,
    updateTemporaryImageToken,
    getTemporaryImageToken,
    decodeUserDataToken,
    getUserToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook para manutenção de dados do usuário.
 */
function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext usado fora do AuthProvider!");

  return context;
}

export { AuthProvider, useAuth };
