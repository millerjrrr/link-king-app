import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CollectionNavigator from "./subnavigators/CollectionNavigator";
import OptionsNavigator from "./subnavigators/OptionsNavigator";
import ConsoleNavigator from "./subnavigators/ConsoleNavigator";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import ManageAccountNavigator from "./subnavigators/ManageAccountNavigator";
import useColors from "@src/hooks/utilityHooks/useColors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {
    CONTRAST: color,
    PRIMARY,
    INACTIVE_CONTRAST,
  } = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: INACTIVE_CONTRAST,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          color,
          backgroundColor: PRIMARY,
          height: 80,
          padding: 10,
          borderTopWidth: 0,
        },
      }}
      initialRouteName="Console:"
    >
      <Tab.Screen
        name="Console:"
        component={ConsoleNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller"
              size={size + 15}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Collection:"
        component={CollectionNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="open-book"
              size={size + 15}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Options:"
        component={OptionsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="settings"
              size={size + 15}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Manage Account:"
        component={ManageAccountNavigator} // Componente da aba oculta
        options={{
          tabBarButton: () => null, // Oculta o botão da aba
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
