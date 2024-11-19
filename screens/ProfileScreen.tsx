import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { colors } from "../styles/global";
import LogoutButton from "../components/LogoutButton";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUserName } from "../store/userSelectors";
import { getPosts } from "../firebase/firestore";
import { postSliceActions } from "../store/postSlice";
import { selectPosts } from "../store/postSelectors";
import PostItem from "../components/PostItem";
import { ScrollView } from "react-native-gesture-handler";

const ProfileScreen = () => {
  const userName = useAppSelector(selectUserName);

  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(posts.length === 0);

  useEffect(() => {
    if (posts.length === 0) {
      getPosts().then((posts) => {
        dispatch(postSliceActions.setPosts(posts));
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/registration_bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.logoutIcon}>
          <LogoutButton />
        </View>

        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={require("../assets/images/user.png")}
            style={styles.avatarPlaceholder}
          />
          <Icon
            name={"close"}
            size={25}
            color={colors.placeholderGrey}
            style={styles.addAvatar}
          />
        </TouchableOpacity>

        <Text style={styles.userName}>{userName}</Text>

        <ScrollView contentContainerStyle={styles.postsWrap}>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ScrollView>
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
  postsWrap: {
    gap: 32,
    width: "100%",
  },
});

export default ProfileScreen;
