import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ManageAccountScreen from "../../options/ManageAccountScreen";
import DeleteAccountScreen from "../../options/ManageAccountScreen/Screens/DeleteAccountScreen";
import ChangeNameScreen from "../../options/ManageAccountScreen/Screens/ChangeNameScreen";
import ManageSubscriptionScreen from "../../options/ManageAccountScreen/Screens/ManageSubscriptionScreen";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";

const ManageAccountStack = createStackNavigator();

const ManageAccountNavigator = () => {
  const { colorScheme } = useSelector(getSettingsState);

  const headerTintColor = colors[colorScheme].CONTRAST[0];

  return (
    <ManageAccountStack.Navigator
      screenOptions={{
        tabBarVisible: false,
        headerTintColor,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: "#ffffff00",
        },
      }}
    >
      <ManageAccountStack.Screen
        name="ManageAccountScreen"
        component={ManageAccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <ManageAccountStack.Screen
        name="ChangeNameScreen"
        component={ChangeNameScreen}
      />
      <ManageAccountStack.Screen
        name="ManageSubscriptionScreen"
        component={ManageSubscriptionScreen}
        options={{
          headerShown: false,
        }}
      />
      <ManageAccountStack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </ManageAccountStack.Navigator>
  );
};

export default ManageAccountNavigator;
