import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase.config";

export const registerUserInDb = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentials.user;
  } catch (error) {
    console.error("createUserWithEmailAndPassword failed", error);
    throw error;
  }
};

export const authStateChanged = async (
  onChange: (user: unknown) => void = () => {}
) => {
  onAuthStateChanged(auth, (user) => {
    onChange(user);
  });
};

export const loginUserInDb = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    console.error("signInWithEmailAndPassword failed", error);
    throw error;
  }
};

export const updateUserProfile = async (update: { displayName: string }) => {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error("No current user. Check the logic.");
  }

  try {
    await updateProfile(user, update);
  } catch (error) {
    console.error("updateProfile failed", error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  const auth = getAuth();
  return auth.currentUser;
};

export const signOutUser = async () => {
  const auth = getAuth();
  try {
    await auth.signOut();
  } catch (error) {
    console.error("signOut failed", error);
    throw error;
  }
};
