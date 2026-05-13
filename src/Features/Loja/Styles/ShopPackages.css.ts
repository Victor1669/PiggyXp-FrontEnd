import { StyleSheet } from "react-native";

export const ShopPackagesStyles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    marginVertical: 20,
    paddingBottom: 40,
  },
  introWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  introPicture: {
    width: 60,
    height: 60,
  },
  introTextWrapper: {
    flex: 1,
  },
  packageCard: {
    backgroundColor: "#CAF9FF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  leftPicture: {
    width: 80,
    height: 80,
  },
  middleWrapper: {
    flex: 1,
    gap: 8,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  benefitIcon: {
    width: 20,
    height: 20,
  },
  rightWrapper: {
    justifyContent: "center",
  },
  buyButton: {
    width: "100%",
    paddingVertical: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
