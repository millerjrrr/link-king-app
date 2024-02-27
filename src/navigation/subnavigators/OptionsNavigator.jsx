import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SetDailyGoalScreen from "../../options/SetDailyGoalScreen";
import Options from "../../views/Options";
// import EditUserDetailsScreen from "../../options/EditUserDetailsScreen";

const OptionsStack = createStackNavigator();

const OptionsNavigator = () => {
  return (
    <OptionsStack.Navigator
      screenOptions={{
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
      {/* <OptionsStack.Screen
        name="EditUserDetailsScreen"
        component={EditUserDetailsScreen}
      /> */}
    </OptionsStack.Navigator>
  );
};

export default OptionsNavigator;
