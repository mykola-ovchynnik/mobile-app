import { RootState } from "./store";
import { UserState } from "./userSlice";

export const selectUser = (state: RootState): UserState | null => {
  if (state.user.email) {
    return state.user;
  }
  return null;
};

export const selectUserName = (state: RootState): string | null =>
  selectUser(state)?.name ?? null;
export const selectUserEmail = (state: RootState): string | null =>
  selectUser(state)?.email ?? null;
