import React from "react";
import { StyleSheet, View } from "react-native";

import PostsList from "../components/PostsList";
import User from "../components/User";
import { colors } from "../styles/global";
import posts from "../data/posts";

const PostsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <User userName={"Natali Romanova"} userEmail={"email@example.com"} />
      <PostsList posts={posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
    gap: 32,
  },
});

export default PostsScreen;
