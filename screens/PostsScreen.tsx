import React from "react";
import { View, StyleSheet } from "react-native";
import User from "../components/User";
import PostsList from "../components/PostsList";
import { colors } from "../styles/global";

import forestImage from "../assets/images/forest.png";
import skyImage from "../assets/images/sky.png";
import houseImage from "../assets/images/house.png";

const posts = [
  {
    id: "1",
    title: "Ліс",
    image: forestImage,
    commentsCount: 10,
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "2",
    title: "Захід на чорному морі",
    image: skyImage,
    commentsCount: 5,
    location: "Ukraine",
  },
  {
    id: "3",
    title: "Старий будиночок у Венеції",
    image: houseImage,
    commentsCount: 8,
    location: "Italy",
  },
];

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
