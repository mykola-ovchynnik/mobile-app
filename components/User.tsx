import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAppSelector } from "../store/store";
import { selectUserName, selectUserEmail } from "../store/userSelectors";

const User: React.FC = () => {
  const userName = useAppSelector(selectUserName);
  const userEmail = useAppSelector(selectUserEmail);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={require("../assets/images/user.png")} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.textName}>{userName}</Text>
        <Text style={styles.textEmail}>{userEmail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
  },
  userInfoContainer: {
    justifyContent: "center",
  },
  textName: {
    fontSize: 13,
    fontWeight: "700",
  },
  textEmail: {
    fontSize: 11,
    fontWeight: "400",
    color: "#212121",
  },
});

export default User;
