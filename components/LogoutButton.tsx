import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../App.consts";
import { getCurrentUser, signOutUser } from "../firebase/firebase-auth";
import { useAppDispatch } from "../store/store";
import { userSliceActions } from "../store/userSlice";

const LogoutButton = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const user = getCurrentUser();
    if (!user) {
      console.error("No user. Check the logic");
      return;
    }

    try {
      await signOutUser();
      dispatch(userSliceActions.clearUser());
      navigation.navigate(ScreenNames.Login);
      console.log("logout successful");
    } catch (error) {
      console.log(error);
    }
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
