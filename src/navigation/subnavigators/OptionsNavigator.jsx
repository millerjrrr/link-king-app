import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SetDailyGoalScreen from "../../options/SetDailyGoalScreen";
import Options from "../../views/Options";
import VoiceSelectionScreen from "../../options/VoiceSelectionScreen";
import DictionarySelectionScreen from "../../options/DictionarySelectionScreen";
import ManageAccountNavigator from "./ManageAccountNavigator";
const OptionsStack = createStackNavigator();

const OptionsNavigator = () => {
  return (
    <OptionsStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <OptionsStack.Screen
        name="OptionsStackScreen"
        component={Options}
      />
      <OptionsStack.Screen
        name="SetDailyGoalScreen"
        component={SetDailyGoalScreen}
      />
      <OptionsStack.Screen
        name="VoiceSelectionScreen"
        component={VoiceSelectionScreen}
      />
      <OptionsStack.Screen
        name="DictionarySelectionScreen"
        component={DictionarySelectionScreen}
      />
      <OptionsStack.Screen
        name="ManageAccountNavigator"
        component={ManageAccountNavigator}
      />
    </OptionsStack.Navigator>
  );
};

export default OptionsNavigator;
