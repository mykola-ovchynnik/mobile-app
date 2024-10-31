import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ImageSourcePropType,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../styles/global";
import userImage from "../assets/images/user.png";

interface Comment {
  id: string;
  userImage: ImageSourcePropType;
  comment: string;
  date: string;
}

const comments: Comment[] = [
  {
    id: "1",
    userImage: userImage,
    comment:
      "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    date: "09 червня, 2020 | 08:40",
  },
  {
    id: "2",
    userImage: userImage,
    comment:
      "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    date: "09 червня, 2020 | 09:14",
  },
  {
    id: "3",
    userImage: userImage,
    comment: "Thank you! That was very helpful!",
    date: "09 червня, 2020 | 09:20",
  },
];

const PostCommentsScreen = ({ route }: any) => {
  const { image } = route.params;
  const [comment, setComment] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image source={image} style={styles.postImage} />
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Image source={item.userImage} style={styles.userImage} />
            <View style={styles.commentContent}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentDate}>{item.date}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.commentsList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          value={comment}
          onChangeText={setComment}
          placeholderTextColor="#BDBDBD"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Feather name="arrow-up" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
    gap: 32,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentsList: {
    gap: 24,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  commentContent: {
    flex: 1,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 16,
    backgroundColor: "#F6F6F6",
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 10,
    color: "#BDBDBD",
  },
  inputContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 50,
    fontSize: 16,
    color: "#212121",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  sendButton: {
    position: "absolute",
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostCommentsScreen;
