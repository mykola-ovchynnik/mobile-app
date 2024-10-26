import { StyleSheet, Text, View, Image } from "react-native";

interface UserProps {
  userName: string;
  userEmail: string;
}

const User: React.FC<UserProps> = ({ userName, userEmail }) => {
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
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
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
