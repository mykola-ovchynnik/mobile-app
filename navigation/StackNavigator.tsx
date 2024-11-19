import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackParamList } from "../App.types";
import { ScreenNames } from "../App.consts";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../styles/global";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import BottomTabNavigator from "./BottomTabNavigator";

import MapScreen from "../screens/MapScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useAppDispatch } from "../store/store";
import { useEffect, useState } from "react";
import { userSliceActions } from "../store/userSlice";
import { ActivityIndicator, View } from "react-native";
import { CommentsScreen } from "../screens/PostCommentsScreen";

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [isUserExists, setIsUserExists] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          userSliceActions.setUser({
            id: currentUser.uid,
            name: currentUser.displayName || "",
            email: currentUser.email || "",
          })
        );

        setIsUserExists(true);
      } else {
        dispatch(userSliceActions.clearUser());
        setIsUserExists(false);
      }
      setIsUserLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isUserLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isUserExists ? ScreenNames.BottomTabNavigator : ScreenNames.Login
      }
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />

      <Stack.Screen
        name={ScreenNames.Registration}
        component={RegistrationScreen}
      />

      <Stack.Screen
        name={ScreenNames.BottomTabNavigator}
        component={BottomTabNavigator}
      />

      <Stack.Screen
        name={ScreenNames.PostComments}
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Коментарі",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: 0.41,
          },
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color={colors.blackPrimary}
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 16 }}
            />
          ),
        })}
      />

      <Stack.Screen
        name={ScreenNames.Map}
        component={MapScreen}
        options={{
          headerShown: true,
          title: "Мапа",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "500",
            lineHeight: 22,
            letterSpacing: 0.41,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
