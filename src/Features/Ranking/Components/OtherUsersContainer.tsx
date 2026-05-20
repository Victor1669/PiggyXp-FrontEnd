import { View } from "react-native";

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useRanking } from "../Contexts/RankingContext";

import RankingUser from "./RankingUser";

export default function OtherUsersContainer() {
  const { otherUsers } = useRanking();
  const { user: yourUser } = useAuth();

  return (
    <View style={{ width: "100%", gap: 15 }}>
      {otherUsers.map((user, index) => {
        const { img, xp, name } = user;
        const USER_IMG = img?.length ? { uri: img } : undefined;
        const position = index + 4;
        const isYourUser = yourUser.name === name && yourUser.xp === xp;

        return (
          <RankingUser
            key={index}
            name={name}
            xp={xp}
            position={position}
            user_img={USER_IMG}
            isYourUser={isYourUser}
          />
        );
      })}
    </View>
  );
}
