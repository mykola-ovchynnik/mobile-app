import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import PostsScreen from "../screens/PostsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TabBarIcon from "../components/TabBarIcon";

type RootStackParamList = {
  Posts: undefined;
  "Create Post": undefined;
  Profile: undefined;
  Login: undefined;
};

type BottomTabNavigatorProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  navigation,
}) => {
  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: "500",
          lineHeight: 22,
          letterSpacing: 0.41,
        },
        headerRightContainerStyle: { padding: 16 },
        headerLeftContainerStyle: { padding: 16 },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarItemStyle: { marginHorizontal: 5 }, // Adds 10px gap between icons
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black", // Ensures icons don't change color on focus
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="grid" color={color} size={size} />
          ),
          headerRight: () => (
            <Icon
              name="log-out"
              size={24}
              color={"#BDBDBD"}
              onPress={handleLogout}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ size }) => (
            <TabBarIcon
              name="plus"
              color="#fff"
              size={size}
              externalStyles={styles.addIconContainer}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "User Profile",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: "#0000004D",
    borderBottomWidth: 1,
  },
  tabBar: {
    height: 60,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 50,
    borderTopWidth: 1,
    borderTopColor: "#0000004D",
    alignItems: "center",
  },
  addIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
});

export default BottomTabNavigator;