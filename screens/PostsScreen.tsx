import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../store/store";
import { selectUserName, selectUserEmail } from "../store/userSelectors";

import PostsList from "../components/PostsList";
import User from "../components/User";
import { colors } from "../styles/global";
import posts from "../data/posts";

const PostsScreen: React.FC = () => {
  const userName = useAppSelector(selectUserName);
  const userEmail = useAppSelector(selectUserEmail);

  return (
    <View style={styles.container}>
      <User userName={userName || ""} userEmail={userEmail || "No email"} />
      <PostsList posts={posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: colors.white,
    gap: 32,
  },
});

export default PostsScreen;
