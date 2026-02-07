import { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { env } from "@Config/env";

import { type User } from "@Auth/Contexts/useAuth";

export const useNativeGoogleAuth = () => {
  const [user, setUser] = useState<User | {}>({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: env.webClientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });

    checkIfSignedIn();
  }, []);

  async function checkIfSignedIn() {
    const userInfo = await GoogleSignin.signInSilently();

    setUserData(userInfo);
  }

  function setUserData(userInfo: any) {
    const googleUser = userInfo.data?.user;

    if (googleUser) {
      setUser({
        name: googleUser.givenName + googleUser.familyName || "",
        email: googleUser.email,
        picture: googleUser.photo || "",
      });
    }
  }

  async function signIn() {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      setUserData(userInfo);

      return true;
    } catch (err: any) {
      console.error("Google Sign-In Error:", {
        code: err.code,
        message: err.message,
        webClientId: env.webClientId,
        androidId: env.androidClientId,
        androidPackage: env.androidPackage,
      });
      return false;
    }
  }

  return {
    user,
    signIn,
  };
};
