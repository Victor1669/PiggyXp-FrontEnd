import { createContext, useContext, useEffect, useState } from "react";

import { screenValues } from "Config/screenValues";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { UserType, PreviewUserType } from "../Types/UserType";

type AuthProviderValues = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  setHasVerifiedUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  login: (userData: UserType) => Promise<void>;
  logout: () => Promise<void>;
  hasUserInfo: boolean;
  hasVerifiedUserInfo: boolean;
};

const AuthContext = createContext<AuthProviderValues | undefined>(undefined);

/**
 * Provider para disponibilizar ações com o usuário atual.
 */
function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userUnit, userInfo, clearStorage } = useStorageItemsContext();
  const [user, setUser] = useState<UserType | PreviewUserType>({} as UserType);
  const [hasVerifiedUserInfo, setHasVerifiedUserInfo] = useState(false);

  const hasUserInfo = Object.values(user).length > 0;

  const { isPreviewBuild } = screenValues();

  async function login(userData: UserType) {
    userInfo.set(JSON.stringify(userData));

    setUser(userData);
  }

  async function logout() {
    await clearStorage();

    setUser({} as UserType);
  }

  useEffect(function getUserInfoFromStore() {
    if (isPreviewBuild) return;

    (async () => {
      const [storedUser, storedUnit] = await Promise.all([
        userInfo.get(),
        userUnit.get(),
      ]);

      if (!storedUnit) {
        await userUnit.set("1");
      }

      setUser(JSON.parse(storedUser || "{}"));
    })();
  }, []);

  const value: AuthProviderValues = {
    user,
    setUser,
    login,
    logout,
    hasUserInfo,
    hasVerifiedUserInfo,
    setHasVerifiedUserInfo,
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
