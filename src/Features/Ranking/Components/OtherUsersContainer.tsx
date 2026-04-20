import RankingUser from "./RankingUser";

import { useRanking } from "../Contexts/RankingContext";
import { View } from "react-native";

export default function OtherUsersContainer() {
  const { otherUsers } = useRanking();

  return (
    <View style={{ width: "100%", gap: 15 }}>
      {otherUsers.map((user, index) => {
        const { img } = user;
        const USER_IMG = img?.length ? { uri: img } : undefined;
        const position = index + 4;

        return (
          <RankingUser
            key={index}
            {...user}
            position={position}
            user_img={USER_IMG}
          />
        );
      })}
    </View>
  );
}
