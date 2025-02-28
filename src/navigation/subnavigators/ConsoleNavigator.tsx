import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import ProgressScreen from "@src/screens/Collection/ProgressScreen";
import HelpScreen from "@src/screens/Console/HelpScreen";
import DictionarySelectionScreen from "@src/screens/Options/DictionarySelectionScreen";
import WordInfoScreen from "@src/screens/Collection/WordInfoScreen";
import EditTicketScreen from "@src/screens/Collection/EditTicketScreen";
import Console from "@src/screens/Console";
import { ConsoleStackParamList } from "@src/types/navigationTypes";
import WrittenInstructions from "@src/screens/walkthrough/WrittenInstructions";
import YoureAllSet from "@src/screens/walkthrough/YoureAllSet";

const ConsoleStack =
  createStackNavigator<ConsoleStackParamList>();

const ConsoleNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPresets.ModalPresentationIOS,
  };
  return (
    <ConsoleStack.Navigator screenOptions={screenOptions}>
      <ConsoleStack.Screen
        name="Console"
        component={Console}
      />
      <ConsoleStack.Screen
        name="Word Details"
        component={WordInfoScreen}
      />
      <ConsoleStack.Screen
        name="Edit Solutions"
        component={EditTicketScreen}
      />
      <ConsoleStack.Screen
        name="Console - Help"
        component={HelpScreen}
      />
      <ConsoleStack.Screen
        name="You're all set!"
        component={YoureAllSet}
      />
      <ConsoleStack.Screen
        name="How to Play"
        component={WrittenInstructions}
      />
      <ConsoleStack.Screen
        name="Progress"
        component={ProgressScreen}
      />
      <ConsoleStack.Screen
        name="Dictionary Selection"
        component={DictionarySelectionScreen}
      />
    </ConsoleStack.Navigator>
  );
};

export default ConsoleNavigator;
