import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { postReducer } from "./postSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
