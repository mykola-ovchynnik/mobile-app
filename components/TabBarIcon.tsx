import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface TabBarIconProps {
  name: string;
  color?: string;
  size?: number;
  externalStyles?: StyleProp<ViewStyle>;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  name,
  color = "black",
  size = 24,
  externalStyles,
}) => {
  return (
    <View style={[styles.iconContainer, externalStyles]}>
      <Icon name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBarIcon;
