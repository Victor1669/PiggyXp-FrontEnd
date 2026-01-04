import { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

const clientID =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
    : "";

export function useGoogleAuth() {
  const [user, setUser] = useState<object>({});

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientID,
      scopes: ["openid", "profile", "email"],
      redirectUri: makeRedirectUri({ scheme: "com.victor1669.piggyxp" }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      (async () => {
        const token = await exchangeCodeForToken(code, request?.codeVerifier);

        if (token?.access_token) {
          const userInfo = await fetchUserInfo(token.access_token);

          if (userInfo) {
            const { email, family_name, given_name, picture } = userInfo;

            setUser({
              name: `${given_name} ${family_name}`,
              email,
              picture,
            });
          }
        }
      })();
    }
  }, [response]);

  return {
    signIn: () => promptAsync(),
    user,
  };
}

async function exchangeCodeForToken(code: string, codeVerifier?: string) {
  if (!codeVerifier) {
    console.error("code_verifier ausente!");
    return null;
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientID!,
        redirect_uri: "com.victor1669.piggyxp://",
        grant_type: "authorization_code",
        code_verifier: codeVerifier,
      }).toString(),
    });

    return await res.json();
  } catch (err) {
    console.error("Erro ao trocar code por token:", err);
    return null;
  }
}

async function fetchUserInfo(accessToken: string) {
  try {
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
}
