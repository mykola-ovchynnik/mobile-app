import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../firebase/firestore.types";

const initialPosts: Post[] = [];

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: initialPosts,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createNewPost: (state, { payload: post }: PayloadAction<Post>) => {
      return {
        ...state,
        posts: [post, ...state.posts],
      };
    },
    setPosts: (state, { payload: posts }: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: [...posts],
      };
    },
    updatePost: (state, { payload: post }: PayloadAction<Post>) => {
      return {
        ...state,
        posts: state.posts.map((p) => (p.id === post.id ? post : p)),
      };
    },
  },
});

export const postSliceActions = postSlice.actions;
export const postReducer = postSlice.reducer;
