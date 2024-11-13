import { ImageSourcePropType } from "react-native";

export interface NewPost {
  image: ImageSourcePropType;
  name: string;
  comments: Comment[];
  likesCount: number;
  location: string;
}

export interface Post extends NewPost {
  id: string;
}

export interface Comment {
  text: string;
  date: string;
  postId: string;
  userId: string;
  id: string;
}
