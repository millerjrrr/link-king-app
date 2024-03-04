import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CollectionNavigator from "./subnavigators/CollectionNavigator";
import OptionsNavigator from "./subnavigators/OptionsNavigator";
import ConsoleNavigator from "./subnavigators/ConsoleNavigator";
import colors from "../utils/colors";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import React from "react";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            color,
            shadowColor: color,
          },
        ],
      }}
      initialRouteName="Console"
    >
      <Tab.Screen
        name="Console"
        component={ConsoleNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              {...{
                name: "game-controller",
                size: size + 15,
                color,
              }}
            />
          ),
          tabBarLabel: "Console",
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Collection"
        component={CollectionNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              {...{
                name: "open-book",
                size: size + 15,
                color,
              }}
            />
          ),
          tabBarLabel: "Collection",
        }}
      />
      <Tab.Screen
        name="Options"
        component={OptionsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              {...{
                name: "settings",
                size: size + 15,
                color,
              }}
            />
          ),
          tabBarLabel: "Options",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.PRIMARY,
    height: 80,
    padding: 10,
    borderTopWidth: 0,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default TabNavigator;
