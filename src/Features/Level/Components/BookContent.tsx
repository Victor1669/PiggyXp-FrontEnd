import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CARD_WIDTH,
  FULL_INNER,
  BOOK_HEIGHT,
  COVER_PADDING,
  COVER_BORDER,
  BROWN_MID,
  BROWN_DARK,
  BROWN_ACCENT,
  GOLD,
  CREAM,
  CREAM_DARK,
  INK_LIGHT,
} from "../constants";

interface BookContentProps {
  leftText: string;
}

export default function BookContent({ leftText }: BookContentProps) {
  return (
    <View style={[styles.coverWrapper, { width: CARD_WIDTH }]}>
      <View
        style={[
          styles.book,
          {
            width: FULL_INNER,
            height: BOOK_HEIGHT - COVER_PADDING - COVER_BORDER,
          },
        ]}
      >
        <View style={[styles.page, { width: FULL_INNER }]}>
          <View style={styles.pageHeader}>
            <Text style={styles.pageNumber}>1</Text>
            <View style={styles.pageHeaderLine} />
          </View>
          <Text style={styles.paragraph}>{leftText}</Text>
          <View style={styles.pageFooter}>
            <View style={styles.pageFooterLine} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  book: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 2,
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
