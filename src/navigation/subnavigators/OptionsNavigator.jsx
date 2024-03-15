import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SetDailyGoalScreen from "../../options/SetDailyGoalScreen";
import Options from "../../views/Options";
import VoiceSelectionScreen from "../../options/VoiceSelectionScreen";
import ColorSchemeScreen from "../../options/ColorSchemeScreen";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import colors from "../../utils/colors";

const OptionsStack = createStackNavigator();

const OptionsNavigator = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const headerTintColor =
    colors[colorScheme].CONTRAST[golden];

  return (
    <OptionsStack.Navigator
      screenOptions={{
        headerTintColor,
        headerTransparent: true,
        headerTitleStyle: { color: "transparent" },
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
        name="ColorSchemeScreen"
        component={ColorSchemeScreen}
      />
    </OptionsStack.Navigator>
  );
};

export default OptionsNavigator;
