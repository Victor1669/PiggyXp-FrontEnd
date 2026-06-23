import { View } from "react-native";

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useRanking } from "../Contexts/RankingContext";

import RankingUser from "./RankingUser";

export default function OtherUsersContainer() {
  const { otherUsers } = useRanking();
  const { user: yourUser } = useAuth();

  return (
    <View style={{ width: "100%" }}>
      {otherUsers.map((user, index) => {
        const { img, xp, name, nivel } = user;
        const user_img = img?.length ? { uri: img } : undefined;
        const position = index + 4;
        const isYourUser = yourUser.name === name && yourUser.xp === xp;

        const rankingUser = {
          name,
          isYourUser,
          nivel,
          position,
          user_img,
          xp,
        };

        return <RankingUser key={index} {...rankingUser} />;
      })}
    </View>
  );
}
