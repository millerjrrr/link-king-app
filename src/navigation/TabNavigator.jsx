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
import React from "react";
import { getColorsState } from "../store/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;
  const tabBarInactiveTintColor =
    colors[colorScheme].INACTIVE_CONTRAST;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            color,
            backgroundColor,
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
