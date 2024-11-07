import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SetDailyGoalScreen from "../../screens/Options/SetDailyGoalScreen";
import DictionarySelectionScreen from "../../screens/Options/DictionarySelectionScreen";
import ManageAccountNavigator from "./ManageAccountNavigator";
import Options from "@src/screens/Options";
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
        name="DictionarySelectionScreen"
        component={DictionarySelectionScreen}
      />
    </OptionsStack.Navigator>
  );
};

export default OptionsNavigator;
