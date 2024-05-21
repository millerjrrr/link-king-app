import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ManageAccountScreen from "../../options/ManageAccountScreen";
import DeleteAccountScreen from "../../options/ManageAccountScreen/Screens/DeleteAccountScreen";
import ChangeNameScreen from "../../options/ManageAccountScreen/Screens/ChangeNameScreen";
import ManageSubscriptionScreen from "../../options/ManageAccountScreen/Screens/ManageSubscriptionScreen";

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
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
      />
    </ManageAccountStack.Navigator>
  );
};

export default ManageAccountNavigator;
