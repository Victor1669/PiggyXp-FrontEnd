/* NÃO SERÁ USADO, APENAS SE DER PROBLEMA NO CÓDIGO NATIVO */

/*import { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { env } from "Config/env";

import { type User } from "@Auth/Contexts/useAuth";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

const clientID = env.androidClientId;

const redirectUri = makeRedirectUri({
  scheme: env.androidPackage,
});

export function useExternalGoogleAuth() {
  if (!clientID) {
    console.error(
      "Google Client ID não definido para este ambiente: " + clientID,
    );
  }
  const [user, setUser] = useState<User | {}>({});

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientID,
      scopes: ["openid", "profile", "email"],
      redirectUri,
    },
    discovery,
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
  if (!codeVerifier) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientID!,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code_verifier: codeVerifier,
    }).toString(),
  });

  return res.json();
}

async function fetchUserInfo(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
}
*/
