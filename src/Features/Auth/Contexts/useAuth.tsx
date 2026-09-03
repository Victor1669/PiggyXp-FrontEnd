import { createContext, useContext, useEffect, useState } from "react";

import {
  getStorageItem,
  setStorageItem,
  clearStorage,
  STORAGE_KEYS,
} from "Utils/securestore";

import { UserType } from "../Types/UserType";

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

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [hasVerifiedUserInfo, setHasVerifiedUserInfo] = useState(false);

  const hasUserInfo = Object.values(user).length > 0;

  async function login(userData: UserType) {
    await setStorageItem(STORAGE_KEYS.userInfo, JSON.stringify(userData));

    setUser(userData);
  }

  async function logout() {
    await clearStorage();

    setUser({} as UserType);
  }

  useEffect(() => {
    Promise.all([
      getStorageItem(STORAGE_KEYS.userInfo),
      getStorageItem(STORAGE_KEYS.userUnit),
    ]).then(([userInfo, userUnit]) => {
      if (!userUnit) {
        setStorageItem(STORAGE_KEYS.userUnit, "1");
      }

      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
    });
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

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext usado fora do AuthProvider!");
  }

  return context;
}

export { AuthProvider, useAuth };
