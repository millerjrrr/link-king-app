import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Console from "../../views/Console";
import TargetDetailsScreen from "../../console/TargetDetailsScreen";
import StatsScreen from "../../collection/StatsScreen";
import HelpScreen from "../../console/HelpScreen";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import colors from "../../utils/colors";

const ConsoleStack = createStackNavigator();

const ConsoleNavigator = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const headerTintColor =
    colors[colorScheme].CONTRAST[golden];
  return (
    <ConsoleStack.Navigator
      screenOptions={{
        headerTintColor,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: "transparent",
        },
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ConsoleStack.Screen
        name="ConsoleStackScreen"
        component={Console}
      />
      <ConsoleStack.Screen
        name="TargetDetailsScreen"
        component={TargetDetailsScreen}
      />
      <ConsoleStack.Screen
        name="HelpScreen"
        component={HelpScreen}
      />
      <ConsoleStack.Screen
        name="StatsScreen"
        component={StatsScreen}
      />
    </ConsoleStack.Navigator>
  );
};

export default ConsoleNavigator;
