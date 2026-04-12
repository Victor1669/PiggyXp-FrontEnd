import { createContext, useContext, useEffect, useState } from "react";

import { StoreItem, JWTStoreItem } from "Helpers/StoreItem";

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
}

type AuthProviderValues = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setHasVerifiedUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  userUnit: StoreItem;
  userEmailWhileRecovering: StoreItem;
  temporaryImageToken: StoreItem;
  refreshToken: StoreItem;
  userToken: JWTStoreItem;
  hasUserInfo: boolean;
  hasVerifiedUserInfo: boolean;
};

const AuthContext = createContext<AuthProviderValues | undefined>(undefined);

/**
 * Provider para disponibilizar ações com o usuário atual.
 */
function AuthProvider({ children }: AuthProviderTypes) {
  const [user, setUser] = useState<User>({} as User);
  const [hasVerifiedUserInfo, setHasVerifiedUserInfo] = useState(false);

  const hasUserInfo = Object.values(user).length > 0;

  async function login(userData: User) {
    await userInfo.set(JSON.stringify(userData));
    setUser(userData);
  }

  async function logout() {
    const allUserInfo = [
      userInfo,
      userEmailWhileRecovering,
      userToken,
      userUnit,
      temporaryImageToken,
      refreshToken,
    ];

    allUserInfo.forEach(async (storeItem) => {
      await storeItem.delete();
    });

    setUser({} as User);
  }

  const userEmailWhileRecovering = new StoreItem("RECOVERY_EMAIL");
  const temporaryImageToken = new StoreItem("TEMPORARY_IMAGE_TOKEN");
  const userInfo = new StoreItem("USER_INFO");
  const userUnit = new StoreItem("USER_UNIT");

  const refreshToken = new JWTStoreItem("REFRESH_TOKEN");
  const userToken = new JWTStoreItem("USER_TOKEN");

  useEffect(function getUserInfoFromStore() {
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
    userEmailWhileRecovering,
    userUnit,
    temporaryImageToken,
    refreshToken,
    userToken,
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
