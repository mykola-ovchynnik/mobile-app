import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { colors } from "../styles/global";
import Post from "./Post";

interface PostsListProps {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Post
          image={item.image}
          name={item.name}
          comments={item.comments}
          location={item.location}
          likesCount={item.likesCount}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 32,
  },
});

export default PostsList;
