import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CollectionNavigator from "./subnavigators/CollectionNavigator";
import OptionsNavigator from "./subnavigators/OptionsNavigator";
import ConsoleNavigator from "./subnavigators/ConsoleNavigator";
import colors from "@src/utils/colors";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import React from "react";
import { settingsState } from "@src/store/settings";
import IsSubscribedWrapper from "../subscription/IsSubscribedWrapper";
import ManageAccountNavigator from "./subnavigators/ManageAccountNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;
  const tabBarInactiveTintColor =
    colors[colorScheme].INACTIVE_CONTRAST;

  return (
    <IsSubscribedWrapper>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarInactiveTintColor,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            color,
            backgroundColor,
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
    </IsSubscribedWrapper>
  );
};

export default TabNavigator;
