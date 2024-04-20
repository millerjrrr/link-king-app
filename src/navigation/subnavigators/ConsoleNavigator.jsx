import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Console from "../../views/Console";
import TargetDetailsScreen from "../../console/TargetDetailsScreen";
import StatsScreen from "../../collection/StatsScreen";
import HelpScreen from "../../console/HelpScreen";
import DictionarySelectionScreen from "../../options/DictionarySelectionScreen";

const ConsoleStack = createStackNavigator();

const ConsoleNavigator = () => {
  return (
    <ConsoleStack.Navigator
      screenOptions={{
        headerShown: false,
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
      <ConsoleStack.Screen
        name="DictionarySelectionScreen"
        component={DictionarySelectionScreen}
      />
    </ConsoleStack.Navigator>
  );
};

export default ConsoleNavigator;
