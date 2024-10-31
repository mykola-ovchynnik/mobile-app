import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Post from "./Post";
import { colors } from "../styles/global";

interface Post {
  id: string;
  title: string;
  image: any;
  commentsCount: number;
  location: string;
}

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
          title={item.title}
          commentsCount={item.commentsCount}
          location={item.location}
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
