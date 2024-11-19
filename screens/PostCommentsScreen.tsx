import React, { FC, useState } from "react";
import {
  PostCommentsScreenRouteProp,
  RootStackNavigationProp,
} from "../App.types";
import { selectUser } from "../store/userSelectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../App.consts";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { addCommentToPost } from "../firebase/firestore";
import { postSliceActions } from "../store/postSlice";
import uuid from "react-native-uuid";
import { Input } from "../components/CommentInput";
import { CommentItem } from "../components/CommentItem";
import { Comment } from "../firebase/firestore.types";

export const CommentsScreen: FC<{
  route?: PostCommentsScreenRouteProp;
}> = ({ route }) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const post = route?.params?.post ?? null;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isSendingComment, setIsSendingComment] = useState<boolean>(false);
  const [writingComment, setWritingComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(post?.comments ?? []);

  console.log("user", user);
  if (!post?.comments || !user) {
    Alert.alert("No comments or no user");
    navigation.navigate(ScreenNames.Posts);
    return null;
  }

  const handleSendComment = async () => {
    if (writingComment.length === 0 || !post.id) {
      return;
    }

    setIsSendingComment(true);

    try {
      const updatedPost = await addCommentToPost({
        postId: post.id,
        comment: {
          text: writingComment,
          date: new Date().toISOString(),
          postId: post.id,
          userId: user.id,
          id: uuid.v4() as string,
        },
      });

      setWritingComment("");
      setComments(updatedPost.comments);
      dispatch(postSliceActions.updatePost(updatedPost));
    } catch (error) {
      console.log(error);
    } finally {
      setIsSendingComment(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.commentsScreenWrap}>
          <View style={styles.imageWrap}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={require("../assets/images/comments-image.png")}
            />
          </View>

          <View style={styles.commentsWrap}>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </View>

          <Input
            placeholder="Коментувати"
            inputState={{ value: writingComment, isValid: true }}
            onChangeText={(value) => setWritingComment(value)}
            inputStyle={styles.commentInput}
            rightButton={
              <TouchableOpacity
                disabled={writingComment.length === 0 || isSendingComment}
                onPress={handleSendComment}
              >
                <Feather name="arrow-up" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            }
            rightButtonStyle={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsScreenWrap: {
    paddingTop: 32,
    flex: 1,
    paddingHorizontal: 16,
    gap: 32,
  },
  imageWrap: {
    width: "100%",
    height: 240,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  commentsWrap: {
    gap: 24,
  },

  commentInput: {
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  sendButton: {
    transform: [{ translateY: -17 }], // 50% of send icon height
  },
});
