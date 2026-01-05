import { useState } from "react";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Settings,
} from "react-native-fbsdk-next";

export function useFacebookAuth() {
  const [user, setUser] = useState<object>({});

  const signIn = async () => {
    try {
      Settings.initializeSDK();

      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error("Erro ao obter o access token");
      }

      await fetchFacebookUser(data.accessToken.toString());
    } catch (error) {
      console.error("Erro no login Facebook:", error);
    }
  };

  const fetchFacebookUser = async (accessToken: string) => {
    return new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        "/me",
        {
          accessToken,
          parameters: {
            fields: {
              string: "id, name, email, picture.type(large)",
            },
          },
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Erro ao buscar dados do perfil:", error);
            reject(error);
          } else {
            const {
              name,
              email,
              picture: {
                data: { url },
              },
            } = result;
            console.log(url);
            setUser({ name, email, picture: url });
            resolve(result);
          }
        }
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  };

  return {
    signIn,
    user,
  };
}
