import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import ManageAccountScreen from "../../screens/ManageAccount";
import DeleteAccountScreen from "../../screens/ManageAccount/DeleteAccountScreen";
import ChangeNameScreen from "../../screens/ManageAccount/ChangeNameScreen";
import ManageSubscriptionScreen from "../../screens/ManageAccount/ManageSubscriptionScreen";
import ChangeHomeLanguageScreen from "../../screens/ManageAccount/ChangeHomeLanguageScreens/ChangeHomeLanguageScreen";
import SelectNewHomeLanguageScreen from "../../screens/ManageAccount/ChangeHomeLanguageScreens/SelectNewLanguageScreen";
import ChangeHomeLanguageWarningScreen from "../../screens/ManageAccount/ChangeHomeLanguageScreens/ChangeHomeLanguageWarningScreen";
import { ManageAccountStackParamList } from "@src/types/navigationTypes";

const ManageAccountStack =
  createStackNavigator<ManageAccountStackParamList>();

const ManageAccountNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPresets.ModalPresentationIOS,
  };

  return (
    <ManageAccountStack.Navigator
      screenOptions={screenOptions}
    >
      <ManageAccountStack.Screen
        name="Manage Account"
        component={ManageAccountScreen}
      />
      <ManageAccountStack.Screen
        name="Change Account Name"
        component={ChangeNameScreen}
      />
      <ManageAccountStack.Screen
        name="Manage Subscription"
        component={ManageSubscriptionScreen}
      />
      <ManageAccountStack.Screen
        name="Change Home Language - Warning"
        component={ChangeHomeLanguageWarningScreen}
      />
      <ManageAccountStack.Screen
        name="Change Home Language"
        component={ChangeHomeLanguageScreen}
      />
      <ManageAccountStack.Screen
        name="Select New Home Language"
        component={SelectNewHomeLanguageScreen}
      />
      <ManageAccountStack.Screen
        name="Delete Account"
        component={DeleteAccountScreen}
      />
    </ManageAccountStack.Navigator>
  );
};

export default ManageAccountNavigator;
