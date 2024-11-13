import { createStackNavigator } from "@react-navigation/stack";
import { StackParamList } from "../App.types";
import { ScreenNames } from "../App.consts";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../styles/global";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import PostCommentsScreen from "../screens/PostCommentsScreen";

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.Login}
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
        component={PostCommentsScreen}
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
    </Stack.Navigator>
  );
};

export default StackNavigator;
