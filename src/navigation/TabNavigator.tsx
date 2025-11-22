import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
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
import { TabParamList } from "@src/types/navigationTypes";
import { Platform } from "react-native";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { PRIMARY, INACTIVE_CONTRAST } = useColors();

  return (
    <Tab.Navigator
      screenOptions={(): BottomTabNavigationOptions => ({
        lazy: false,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: INACTIVE_CONTRAST,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: PRIMARY,
          ...(Platform.OS === "android" && {
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }),
          height:
            base * 80 +
            (Platform.OS === "android" ? base * 50 : 0),
          padding: base * 10,
          borderTopWidth: 0,
          width: "100%",
        },
      })}
      initialRouteName="Console:"
    >
      <Tab.Screen
        name="Console:"
        component={ConsoleNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller"
              size={base * (size + 15)}
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
              size={base * (size + 15)}
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
              size={base * (size + 15)}
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
