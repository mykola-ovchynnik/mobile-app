import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ScreenNames } from "../App.consts";

import PostsScreen from "../screens/PostsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TabBarIcon from "../components/TabBarIcon";
import LogoutButton from "../components/LogoutButton";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.Posts}
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTitle,
        headerRightContainerStyle: styles.headerContainer,
        headerLeftContainerStyle: styles.headerContainer,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
      }}
    >
      <Tab.Screen
        name={ScreenNames.Posts}
        component={PostsScreen}
        options={() => ({
          title: "Публікації",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="grid" color={color} size={size} />
          ),
          headerRight: () => <LogoutButton />,
          headerRightContainerStyle: { paddingRight: 16 },
        })}
      />
      <Tab.Screen
        name={ScreenNames.CreatePost}
        component={CreatePostScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ size }) => (
            <TabBarIcon
              name="plus"
              color="#fff"
              size={size}
              externalStyles={styles.addIconContainer}
            />
          ),
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color={"#212121"}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name={ScreenNames.Profile}
        component={ProfileScreen}
        options={{
          headerShown: false,
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
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: 0.41,
  },
  headerContainer: {
    padding: 16,
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
