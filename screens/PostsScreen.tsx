import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUserName, selectUserEmail } from "../store/userSelectors";

import PostsList from "../components/PostsList";
import User from "../components/User";
import { colors } from "../styles/global";
import { selectPosts } from "../store/postSelectors";
import { ScrollView } from "react-native-gesture-handler";
import PostItem from "../components/PostItem";
import { getPosts } from "../firebase/firestore";
import { postSliceActions } from "../store/postSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;

const PostsScreen: React.FC = () => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(posts.length === 0);

  useEffect(() => {
    if (posts.length === 0) {
      getPosts().then((posts) => {
        console.log("posts", posts);

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.postsScreenWrap}>
          <User />

          <View style={styles.postsWrap}>
            {posts ? (
              posts.map((post) => <PostItem key={post.id} post={post} />)
            ) : (
              <Text>No posts</Text>
            )}
          </View>
        </View>
      </ScrollView>
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
  scrollViewContent: {
    paddingBottom: 100,
    position: "relative",
  },
  postsScreenWrap: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    backgroundColor: "white",
    alignItems: "center",
    gap: 32,
  },
  postsWrap: {
    width: "100%",
    gap: 32,
  },
});

export default PostsScreen;
