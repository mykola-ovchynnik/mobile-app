import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/global";

interface SubmitButtonProps {
  text: string;
  onPress: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel={text}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18.75,
  },
});

export default SubmitButton;
