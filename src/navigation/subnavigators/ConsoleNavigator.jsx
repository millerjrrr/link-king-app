import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ProgressScreen from "@src/screens/Collection/ProgressScreen";
import HelpScreen from "@src/screens/Console/HelpScreen";
import DictionarySelectionScreen from "@src/screens/Options/DictionarySelectionScreen";
import WordInfoScreen from "@src/screens/Collection/WordInfoScreen";
import EditTicketScreen from "@src/screens/Collection/WordInfoScreen/EditTicketScreen";
import Console from "@src/screens/Console";

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
