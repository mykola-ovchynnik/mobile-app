import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../App.consts";

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate(ScreenNames.Login);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Icon name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    padding: 10,
  },
});

export default LogoutButton;
