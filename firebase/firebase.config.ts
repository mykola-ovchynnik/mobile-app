import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2gZ53Ep-2RDc_tl6hT_iHuOBM989vIpg",
  authDomain: "my-app-5061a.firebaseapp.com",
  projectId: "my-app-5061a",
  storageBucket: "my-app-5061a.firebasestorage.app",
  appId: "1:223837419458:android:3267896304de8cb2ba085b",
  databaseURL: "<https://my-app-5061a.firebaseio.com>",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
