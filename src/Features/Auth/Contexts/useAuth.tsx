import { createContext, useContext, useEffect, useState } from "react";

import { StoreItem, JWTStoreItem } from "Helpers/StoreItem";

interface AuthProviderTypes {
  children: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  user_img: string;
  xp: number;
  level: number;
  coins: number;
}

type AuthProviderValues = {
  user: User;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  firstTimeLogged: StoreItem;
  userEmailWhileRecovering: StoreItem;
  refreshToken: StoreItem;
  temporaryImageToken: StoreItem;
  userToken: JWTStoreItem;
};

const AuthContext = createContext<AuthProviderValues | undefined>(undefined);

/**
 * Provider para disponibilizar ações com o usuário atual.
 */
function AuthProvider({ children }: AuthProviderTypes) {
  const [user, setUser] = useState<User>({} as User);

  async function login(userData: User) {
    await userInfo.set(JSON.stringify(userData));

    setUser(userData);
  }

  async function logout() {
    const allUserInfo = [
      userInfo,
      userEmailWhileRecovering,
      userToken,
      temporaryImageToken,
      refreshToken,
    ];

    await firstTimeLogged.set("true");

    allUserInfo.forEach(async (storeItem) => {
      await storeItem.delete();
    });

    console.log(await userInfo.get());

    setUser({} as User);
  }

  const userInfo = new StoreItem("USER_INFO");
  const firstTimeLogged = new StoreItem("FIRST_TIME_LOGGED");
  const userEmailWhileRecovering = new StoreItem("RECOVERY_EMAIL");
  const temporaryImageToken = new StoreItem("TEMPORARY_IMAGE_TOKEN");
  const refreshToken = new StoreItem("REFRESH_TOKEN");

  const userToken = new JWTStoreItem("USER_TOKEN");

  useEffect(() => {
    async function getUserInfoFromStore() {
      const storedUser = await userInfo.get();

      setUser(JSON.parse(storedUser || "{}"));
    }
    getUserInfoFromStore();
  }, []);

  const value: AuthProviderValues = {
    user,
    login,
    logout,
    firstTimeLogged,
    userEmailWhileRecovering,
    refreshToken,
    temporaryImageToken,
    userToken,
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
