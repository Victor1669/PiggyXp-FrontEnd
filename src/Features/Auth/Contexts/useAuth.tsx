import { createContext, useContext, useEffect, useState } from "react";

import { screenValues } from "Config/screenValues";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

//#region Interfaces e Types
interface AuthProviderTypes {
  children: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  user_img: string | undefined;
  xp: number;
  nivel: number;
  coins: number;
  difficulty: number;
  first_login: boolean;
  lives: number;
  achievements: string;
  collectedAchievements: string;
  reset_lives_at: string;
}

export interface PreviewUser extends User {
  isPreview: true;
}

type AuthProviderValues = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setHasVerifiedUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  hasUserInfo: boolean;
  hasVerifiedUserInfo: boolean;
};
//#endregion

const AuthContext = createContext<AuthProviderValues | undefined>(undefined);

/**
 * Provider para disponibilizar ações com o usuário atual.
 */
function AuthProvider({ children }: AuthProviderTypes) {
  const { userUnit, userInfo, clearStorage } = useStorageItemsContext();
  const [user, setUser] = useState<User | PreviewUser>({} as User);
  const [hasVerifiedUserInfo, setHasVerifiedUserInfo] = useState(false);

  const hasUserInfo = Object.values(user).length > 0;

  const { isPreviewBuild } = screenValues();

  async function login(userData: User) {
    userInfo.set(JSON.stringify(userData));

    setUser(userData);
  }

  async function logout() {
    await clearStorage();

    setUser({} as User);
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
