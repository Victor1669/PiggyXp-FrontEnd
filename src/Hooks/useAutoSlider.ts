import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

interface UseAutoSliderParams {
  totalItems: number;
  delay: number;
  bounce?: boolean;
  peek?: boolean;
  itemWidth?: number;
}

interface UseAutoSliderReturn {
  flatListRef: React.RefObject<FlatList | null>;
  currentIndex: number;
  isUserInteracting: boolean;
  handleUserInteractionStart: () => void;
  handleScrollEnd: (index: number) => void;
}

const PEEK_OFFSET = 40;
const PEEK_SETTLE_DELAY = 400;

export function useAutoSlider({
  totalItems,
  delay,
  bounce = false,
  peek = false,
  itemWidth,
}: UseAutoSliderParams): UseAutoSliderReturn {
  const flatListRef = useRef<FlatList | null>(null);
  const currentIndexRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const lastIndex = totalItems - 1;

  function scrollToIndex(index: number) {
    const flatList = flatListRef.current;
    if (!flatList) return;

    if (peek && itemWidth !== undefined) {
      const baseOffset = itemWidth * index;

      const steps = [
        { offset: baseOffset, delay: 0 },
        {
          offset: baseOffset + PEEK_OFFSET,
          delay: delay - PEEK_SETTLE_DELAY - 400,
        },
        { offset: baseOffset, delay: delay - PEEK_SETTLE_DELAY },
      ];

      steps.forEach(({ offset, delay: stepDelay }) => {
        setTimeout(() => {
          flatList.scrollToOffset({ offset, animated: true });
        }, stepDelay);
      });
    } else {
      flatList.scrollToIndex({ index, animated: true });
    }
  }

  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      let nextIndex: number;

      if (bounce) {
        nextIndex = currentIndexRef.current + directionRef.current;

        if (nextIndex > lastIndex) {
          directionRef.current = -1;
          nextIndex = lastIndex - 1;
        } else if (nextIndex < 0) {
          directionRef.current = 1;
          nextIndex = 1;
        }
      } else {
        nextIndex =
          currentIndexRef.current + 1 > lastIndex
            ? 0
            : currentIndexRef.current + 1;
      }

      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, delay);

    return () => clearInterval(interval);
  }, [isUserInteracting, delay, bounce, lastIndex, peek, itemWidth]);

  function handleUserInteractionStart() {
    setIsUserInteracting(true);
  }

  function handleScrollEnd(index: number) {
    currentIndexRef.current = index;
    setCurrentIndex(index);
  }

  return {
    flatListRef,
    currentIndex,
    isUserInteracting,
    handleUserInteractionStart,
    handleScrollEnd,
  };
}
