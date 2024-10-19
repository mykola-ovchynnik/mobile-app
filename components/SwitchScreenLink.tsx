import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { sharedStyles } from "../styles/SharedStyles";

interface SwitchScreenLinkProps {
  prompt: string;
  linkText: string;
  onPress: () => void;
}

const SwitchScreenLink: React.FC<SwitchScreenLinkProps> = ({
  prompt,
  linkText,
  onPress,
}) => (
  <View style={styles.container}>
    <Text style={sharedStyles.baseText}>{prompt}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={[sharedStyles.baseText, styles.linkText]}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  linkText: {
    textDecorationLine: "underline",
  },
});

export default SwitchScreenLink;
