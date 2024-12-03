import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import SetDailyGoalScreen from "../../screens/Options/SetDailyGoalScreen";
import DictionarySelectionScreen from "../../screens/Options/DictionarySelectionScreen";
import Options from "@src/screens/Options";
import { OptionsStackParamList } from "@src/types/navigationTypes";

const OptionsStack =
  createStackNavigator<OptionsStackParamList>();

const OptionsNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPresets.ModalPresentationIOS,
  };

  return (
    <OptionsStack.Navigator screenOptions={screenOptions}>
      <OptionsStack.Screen
        name="Options"
        component={Options}
      />
      <OptionsStack.Screen
        name="Set Daily Goals"
        component={SetDailyGoalScreen}
      />
      <OptionsStack.Screen
        name="Dictionary Selection"
        component={DictionarySelectionScreen}
      />
    </OptionsStack.Navigator>
  );
};

export default OptionsNavigator;
