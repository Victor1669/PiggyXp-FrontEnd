import { ScrollView } from "react-native";

import { useDynamicScroll } from "Contexts/useDynamicScroll";
import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import { screenValues } from "Config/screenValues";

import { getPathDirection } from "../Helpers/getPathDirection";

import SectionLevel from "../Components/SectionLevel";
import SectionTitle from "../Components/SectionTitle";

export default function HomeContent() {
  const { setShowSheet } = useShowSheet();
  const { setIsScrolling } = useDynamicScroll();
  const { levels } = useLevels();

  const { deviceWidth, deviceHeight } = screenValues();

  const SCROLLVIEW_STYLES = {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.68,
  };

  const CONTENT_STYLES = {
    height: levels.length * 130,
  };

  function handleScrollBegin() {
    setShowSheet(false);
    setIsScrolling(true);
  }

  function handleScrollEnd() {
    setIsScrolling(false);
  }

  return (
    <>
      <SectionTitle />
      <ScrollView
        style={SCROLLVIEW_STYLES}
        contentContainerStyle={CONTENT_STYLES}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        bounces={false}
        overScrollMode="never"
      >
        <Content />
      </ScrollView>
    </>
  );
}

function Content() {
  const { levels } = useLevels();

  return levels.map((level, i) => {
    const actualPosition = level.containerPosition;
    const nextPosition = levels[i + 1]?.containerPosition;

    const pathDirection = getPathDirection(i, actualPosition, nextPosition);

    return (
      <SectionLevel
        key={i}
        index={i}
        pathDirection={pathDirection}
        level={level}
      />
    );
  });
}
