import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ManageAccountScreen from "../../options/ManageAccountScreen";
import DeleteAccountScreen from "../../options/ManageAccountScreen/Screens/DeleteAccountScreen";
import ChangeNameScreen from "../../options/ManageAccountScreen/Screens/ChangeNameScreen";
import ManageSubscriptionScreen from "../../options/ManageAccountScreen/Screens/ManageSubscriptionScreen";
import ChangeHomeLanguageScreen from "../../options/ManageAccountScreen/Screens/ChangeHomeLanguageScreen";
import SelectNewHomeLanguageScreen from "../../options/ManageAccountScreen/Screens/SelectNewHomeLanguage";
import ChangeHomeLanguageWarningScreen from "../../options/ManageAccountScreen/Screens/ChangeHomeLanguageWarningScreen";

const ManageAccountStack = createStackNavigator();

const ManageAccountNavigator = () => {
  return (
    <ManageAccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ManageAccountStack.Screen
        name="ManageAccountScreen"
        component={ManageAccountScreen}
      />
      <ManageAccountStack.Screen
        name="ChangeNameScreen"
        component={ChangeNameScreen}
      />
      <ManageAccountStack.Screen
        name="ManageSubscriptionScreen"
        component={ManageSubscriptionScreen}
      />
      <ManageAccountStack.Screen
        name="ChangeHomeLanguageWarningScreen"
        component={ChangeHomeLanguageWarningScreen}
      />
      <ManageAccountStack.Screen
        name="ChangeHomeLanguageScreen"
        component={ChangeHomeLanguageScreen}
      />
      <ManageAccountStack.Screen
        name="SelectNewHomeLanguageScreen"
        component={SelectNewHomeLanguageScreen}
      />
      <ManageAccountStack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
      />
    </ManageAccountStack.Navigator>
  );
};

export default ManageAccountNavigator;
