import { StyleSheet } from "react-native";
import { colors } from "../styles/global";

export const sharedStyles = StyleSheet.create({
  formInnerContainer: {
    width: "100%",
    gap: 16,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  buttonContainer: {
    gap: 16,
    width: "100%",
  },
});
