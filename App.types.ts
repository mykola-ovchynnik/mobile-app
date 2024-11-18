import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ScreenNames } from "./App.consts";

export type StackParamList = {
  [ScreenNames.Login]: undefined;
  [ScreenNames.Registration]: undefined;
  [ScreenNames.BottomTabNavigator]: undefined;
  [ScreenNames.PostComments]: { postId: string };
  [ScreenNames.Posts]: undefined;
  [ScreenNames.CreatePost]: undefined;
  [ScreenNames.Profile]: undefined;
  [ScreenNames.Map]: { location: string };
};

export type RootStackNavigationProp = StackNavigationProp<StackParamList>;

// LoginScreen
export type LoginScreenNavigationProp = StackNavigationProp<
  StackParamList,
  ScreenNames.Login
>;
export type LoginScreenRouteProp = RouteProp<StackParamList, ScreenNames.Login>;

// RegistrationScreen
export type RegistrationScreenNavigationProp = StackNavigationProp<
  StackParamList,
  ScreenNames.Registration
>;
export type RegistrationScreenRouteProp = RouteProp<
  StackParamList,
  ScreenNames.Registration
>;

// PostCommentsScreen
export type PostCommentsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  ScreenNames.PostComments
>;
export type PostCommentsScreenRouteProp = RouteProp<
  StackParamList,
  ScreenNames.PostComments
>;

export type MapScreenNavigationProp = StackNavigationProp<
  StackParamList,
  ScreenNames.Map
>;

// MapScreen
export type MapScreenRouteProp = RouteProp<StackParamList, ScreenNames.Map>;
