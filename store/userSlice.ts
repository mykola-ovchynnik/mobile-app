import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
    },
    clearUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
    },
  },
});

export const userSliceActions = userSlice.actions;
export const userReducer = userSlice.reducer;
