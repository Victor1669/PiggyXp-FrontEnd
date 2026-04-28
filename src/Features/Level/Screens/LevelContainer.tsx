import { useRef, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useQuiz } from "../Contexts/useQuiz";
import QuestionContainer from "../Components/QuestionContainer";
import LevelHeader from "../Components/LevelHeader";
import LevelSheet from "../Components/LevelSheet";
import CoinRain from "../Components/CoinRain";
import { LevelContainerStyles } from "../Styles/LevelContainerStyles.css";
import { screenValues } from "Config/screenValues";

const { container } = LevelContainerStyles;
const { deviceWidth } = screenValues();

export default function LevelContainer() {
  const { questions, currentQuestionIndex, dispatch } = useQuiz();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (questions.length > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentQuestionIndex,
        animated: true,
      });
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    dispatch({ type: "QUIZ_COMECOU" });
  }, []);

  return (
    <View style={container}>
      <LevelHeader />
      <CoinRain />
      <FlatList
        ref={flatListRef}
        data={questions}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index }) => (
          <View style={{ width: deviceWidth }}>
            <QuestionContainer index={index} />
          </View>
        )}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <LevelSheet />
    </View>
  );
}
