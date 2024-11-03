import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ManageAccountScreen from "../../screens/Options/ManageAccountScreen";
import DeleteAccountScreen from "../../screens/Options/DeleteAccountScreen";
import ChangeNameScreen from "../../screens/Options/ChangeNameScreen";
import ManageSubscriptionScreen from "../../screens/Options/ManageSubscriptionScreen";
import ChangeHomeLanguageScreen from "../../screens/Options/ChangeHomeLanguageScreen";
import SelectNewHomeLanguageScreen from "../../screens/Options/SelectNewHomeLanguage";
import ChangeHomeLanguageWarningScreen from "../../screens/Options/ChangeHomeLanguageWarningScreen";

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
