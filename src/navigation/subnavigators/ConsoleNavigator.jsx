import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ProgressScreen from "../../collection/ProgressScreen";
import HelpScreen from "../../console/HelpScreen";
import DictionarySelectionScreen from "../../options/DictionarySelectionScreen";
import WordInfoScreen from "../../collection/WordInfoScreen";
import EditTicketScreen from "../../collection/WordInfoScreen/EditTicketScreen";
import Console from "../../screens/Console";

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
        name="WordInfoScreen"
        component={WordInfoScreen}
      />
      <ConsoleStack.Screen
        name="EditTicketScreen"
        component={EditTicketScreen}
      />
      <ConsoleStack.Screen
        name="HelpScreen"
        component={HelpScreen}
      />
      <ConsoleStack.Screen
        name="ProgressScreen"
        component={ProgressScreen}
      />
      <ConsoleStack.Screen
        name="DictionarySelectionScreen"
        component={DictionarySelectionScreen}
      />
    </ConsoleStack.Navigator>
  );
};

export default ConsoleNavigator;
