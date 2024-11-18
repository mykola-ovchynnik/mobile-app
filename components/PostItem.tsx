import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/global";
import { StackNavigationProp } from "@react-navigation/stack";
import { Post } from "../firebase/firestore.types";
import { ScreenNames } from "../App.consts";
import { StackParamList } from "../App.types";

type RootStackParamList = {
  PostComments: { image: any };
  Map: StackParamList["Map"];
};

type PostNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PostComments"
>;

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const navigation = useNavigation<PostNavigationProp>();

  return (
    <View style={styles.container}>
      <Image source={post.image} style={styles.image} />
      <Text style={styles.title}>{post.name}</Text>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.commentsContainer}
          onPress={() =>
            navigation.navigate("PostComments", { image: post.image })
          }
        >
          <Feather
            name="message-circle"
            size={24}
            color={colors.placeholderGrey}
          />
          <Text style={styles.commentsText}>{post.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() =>
            navigation.navigate(ScreenNames.Map, {
              location: post.location,
            })
          }
        >
          <Feather name="map-pin" size={24} color={colors.placeholderGrey} />
          <Text style={styles.locationText}>{post.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: colors.blackPrimary,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsText: {
    fontSize: 16,
    color: colors.blackPrimary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    textDecorationLine: "underline",
    color: colors.blackPrimary,
  },
});

export default PostItem;
