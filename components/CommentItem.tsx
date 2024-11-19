import React, { FC } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../store/store";
import { selectUser } from "../store/userSelectors";
import { Comment } from "../firebase/firestore.types";

export const CommentItem: FC<{ comment: Comment }> = ({ comment }) => {
  const user = useAppSelector(selectUser);

  if (!user) {
    Alert.alert("Помилка", "Користувач не знайдений");
    return null;
  }

  const isOwner = comment.userId === user.id;

  return (
    <View
      style={[styles.commentWrap, isOwner && { flexDirection: "row-reverse" }]}
    >
      <View style={styles.commentLeft}>
        <Image
          source={require("../assets/images/user.png")}
          style={{ width: 28, height: 28 }}
          resizeMode="cover"
        />
      </View>

      <View style={styles.commentRight}>
        <Text style={styles.commentText}>{comment.text}</Text>

        <Text style={[styles.commentDate, isOwner && { textAlign: "left" }]}>
          {comment.date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrap: {
    flexDirection: "row",
    gap: 16,
  },
  commentLeft: {
    flex: 0,
  },
  commentRight: {
    flex: 1,
    backgroundColor: "#00000008",
    borderRadius: 6,
    padding: 16,
    gap: 8,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    flexWrap: "wrap",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
    textAlign: "right",
    color: "#BDBDBD",
  },
});
