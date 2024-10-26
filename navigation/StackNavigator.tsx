import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import BottomTabNavigator from "./BottomTabNavigator";

export type StackParamList = {
  BottomTabNavigator: undefined;
  Login: undefined;
  Registration: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
