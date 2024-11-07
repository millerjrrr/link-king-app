import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import ManageAccountScreen from "../../screens/ManageAccount";
import DeleteAccountScreen from "../../screens/ManageAccount/DeleteAccountScreen";
import ChangeNameScreen from "../../screens/ManageAccount/ChangeNameScreen";
import ManageSubscriptionScreen from "../../screens/ManageAccount/ManageSubscriptionScreen";
import ChangeHomeLanguageScreen from "../../screens/ManageAccount/ChangeHomeLanguageScreens/ChangeHomeLanguageScreen";
import SelectNewHomeLanguageScreen from "../../screens/ManageAccount/ChangeHomeLanguageScreens/SelectNewLanguageScreen";
import ChangeHomeLanguageWarningScreen from "../../screens/ManageAccount/ChangeHomeLanguageScreens/ChangeHomeLanguageWarningScreen";

const ManageAccountStack = createStackNavigator();

const ManageAccountNavigator = () => {
  return (
    <ManageAccountStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
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
