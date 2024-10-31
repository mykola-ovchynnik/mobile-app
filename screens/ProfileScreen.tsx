import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon2 from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import bgImage from "../assets/images/registration_bg.jpg";
import avatarImage from "../assets/images/user.png";
import posts from "../data/posts";
import Post from "../components/Post";
import { colors } from "../styles/global";

const ProfileScreen = () => {
  const [avatarUri, setAvatarUri] = useState(avatarImage);
  const navigation = useNavigation();

  const handleAvatarSelection = () => {
    setAvatarUri("");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
          <Icon2 name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={handleAvatarSelection}
        >
          <Image source={avatarUri} style={styles.avatarPlaceholder} />
          <Icon
            name={avatarUri ? "close" : "plus"}
            size={25}
            color={avatarUri ? colors.placeholderGrey : colors.orange}
            style={styles.addAvatar}
          />
        </TouchableOpacity>

        <Text style={styles.userName}>Natali Romanova</Text>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              image={item.image}
              title={item.title}
              commentsCount={item.commentsCount}
              location={item.location}
            />
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
    flex: 1,
    marginTop: 150,
  },
  logoutIcon: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  avatarContainer: {
    position: "absolute",
    top: 0,
    transform: [{ translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: colors.lightGrey,
    borderRadius: 16,
    alignSelf: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    bottom: 14,
    right: 0,
    transform: [{ translateX: 12 }],
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  userName: {
    fontSize: 30,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 32,
  },
});

export default ProfileScreen;
