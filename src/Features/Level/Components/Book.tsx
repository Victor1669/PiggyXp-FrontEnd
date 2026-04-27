import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import {
  PAGE_WIDTH,
  SPINE_WIDTH,
  BOOK_HEIGHT,
  BROWN_MID,
  BROWN_DARK,
  BROWN_ACCENT,
  GOLD,
  CREAM,
  CREAM_DARK,
  INK_LIGHT,
} from "../constants";
import FlippableCard from "./FlippableCard";

interface BookProps {
  leftText: string;
  rightText?: string;
}

export default function Book({ leftText, rightText }: BookProps) {
  const hasRightPage = !!rightText;
  const bookWidth = PAGE_WIDTH * 2 + SPINE_WIDTH;

  if (!hasRightPage) {
    return (
      <View style={styles.outerWrapper}>
        <FlippableCard leftText={leftText} />
      </View>
    );
  }

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.coverWrapper}>
        <ScrollView
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={styles.scrollView}
          contentContainerStyle={{ width: bookWidth }}
          decelerationRate="normal"
        >
          <View
            style={[styles.book, { width: bookWidth, height: BOOK_HEIGHT }]}
          >
            <View style={[styles.page, { width: PAGE_WIDTH }]}>
              <View style={styles.pageHeader}>
                <Text style={styles.pageNumber}>1</Text>
                <View style={styles.pageHeaderLine} />
              </View>
              <Text style={styles.paragraph}>{leftText}</Text>
              <View style={styles.pageFooter}>
                <View style={styles.pageFooterLine} />
              </View>
            </View>

            <View style={styles.spine} />

            <View style={[styles.page, { width: PAGE_WIDTH }]}>
              <View style={styles.pageHeader}>
                <View style={styles.pageHeaderLine} />
                <Text style={styles.pageNumber}>2</Text>
              </View>
              <Text style={styles.paragraph}>{rightText}</Text>
              <View style={styles.pageFooter}>
                <View style={styles.pageFooterLine} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Text style={styles.hint}>← arraste para explorar →</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    marginHorizontal: 24,
    gap: 14,
  },
  hint: {
    textAlign: "center",
    fontSize: 12,
    color: BROWN_ACCENT,
    letterSpacing: 2,
    opacity: 0.6,
    textTransform: "uppercase",
  },
  coverWrapper: {
    backgroundColor: BROWN_MID,
    padding: 18,
    borderWidth: 3,
    borderColor: BROWN_DARK,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },
  scrollView: {
    flexGrow: 0,
  },
  book: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 2,
  },
  spine: {
    width: SPINE_WIDTH,
    backgroundColor: BROWN_DARK,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 10,
  },
  page: {
    backgroundColor: CREAM,
    padding: 24,
    borderColor: CREAM_DARK,
    position: "relative",
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  pageNumber: {
    fontSize: 11,
    color: BROWN_ACCENT,
    fontWeight: "600",
    letterSpacing: 1,
  },
  pageHeaderLine: {
    flex: 1,
    height: 0.8,
    backgroundColor: GOLD,
    opacity: 0.5,
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 26,
    color: INK_LIGHT,
    textAlign: "justify",
    letterSpacing: 0.2,
  },
  pageFooter: {
    position: "absolute",
    bottom: 16,
    left: 24,
    right: 24,
  },
  pageFooterLine: {
    height: 0.8,
    backgroundColor: GOLD,
    opacity: 0.4,
  },
});
