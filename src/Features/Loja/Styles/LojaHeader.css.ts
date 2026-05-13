import { StyleSheet, StatusBar } from "react-native";

export const LojaHeaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingTop: (StatusBar.currentHeight ?? 55) + 20,
    paddingBottom: 30,
    backgroundColor: "#314A63",
    gap: 20,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
    gap: 5,
  },
  headerPicture: {
    width: 120,
    height: 120,
  },
  coinContainer: {
    width: "100%",
    backgroundColor: "#02B1E2",

    borderRadius: 25,
    padding: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  coinIcon: {
    width: 50,
    height: 50,
  },
});
