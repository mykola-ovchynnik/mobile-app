import { FC } from "react";
import { View } from "react-native";
import User from "../components/User";

const PostsScreen: FC = () => {
  return (
    <View>
      <User userName={"Natali Romanova"} userEmail={"email@example.com"} />
    </View>
  );
};

export default PostsScreen;
