import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Console from "../../views/Console";
import TargetDetailsScreen from "../../console/TargetDetailsScreen";
import StatsScreen from "../../collection/StatsScreen";

const ConsoleStack = createStackNavigator();

const ConsoleNavigator = () => {
  return (
    <ConsoleStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: { color: "transparent" },
        ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName="ConsoleStackScreen"
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
        name="StatsScreen"
        component={StatsScreen}
      />
    </ConsoleStack.Navigator>
  );
};

export default ConsoleNavigator;
