//#region Importações
import { ScrollView } from "react-native";

import { useDynamicScroll } from "Contexts/useDynamicScroll";
import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import { screenValues } from "Config/screenValues";
const { deviceWidth, deviceHeight } = screenValues();

import { getPathDirection } from "../Helpers/getPathDirection";

import SectionLevel from "./SectionLevel";
import SectionTitle from "./SectionTitle";
//#endregion

export default function Section({ title }: { title: string }) {
  const { setShowSheet } = useShowSheet();
  const { setIsScrolling } = useDynamicScroll();
  const { levels } = useLevels();

  return (
    <>
      <SectionTitle title={title} />
      <ScrollView
        style={{ width: deviceWidth * 0.9, height: deviceHeight * 0.68 }}
        contentContainerStyle={{
          height: levels.length * 130,
        }}
        onScrollBeginDrag={() => {
          setShowSheet(false);
          setIsScrolling(true);
        }}
        onScrollEndDrag={() => setIsScrolling(false)}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        bounces={false}
        overScrollMode="never"
      >
        {levels.map((level, i) => {
          const actualPosition = level.containerPosition;
          const nextPosition = levels[i + 1]?.containerPosition;

          const pathDirection = getPathDirection(
            i,
            actualPosition,
            nextPosition,
          );

          return (
            <SectionLevel
              key={i}
              index={i}
              pathDirection={pathDirection}
              level={level}
            />
          );
        })}
      </ScrollView>
    </>
  );
}
