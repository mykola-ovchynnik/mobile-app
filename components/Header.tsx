import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../styles/global";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Text style={styles.title}>{title}</Text>
);

const styles = StyleSheet.create({
  title: {
    color: colors.blackPrimary,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    marginBottom: 32,
  },
});

export default Header;
