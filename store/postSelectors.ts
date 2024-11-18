import { RootState } from "./store";
import { Post } from "../firebase/firestore.types";

export const selectPosts = (state: RootState): Post[] => state.posts.posts;
