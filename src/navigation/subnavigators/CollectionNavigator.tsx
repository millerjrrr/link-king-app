import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationOptions,
} from "@react-navigation/stack";
import DictionarySelectionScreen from "../../screens/Options/DictionarySelectionScreen";
import WordInfoScreen from "@src/screens/Collection/WordInfoScreen";
import EditTicketScreen from "@src/screens/Collection/WordInfoScreen/EditTicketScreen";
import Collection from "@src/screens/Collection";
import StatsScreen from "@src/screens/Collection/StatsScreen";
import ProgressScreen from "@src/screens/Collection/ProgressScreen";
import DictionaryLookupScreen from "@src/screens/Collection/DictionaryLookupScreen";
import { CollectionStackParamList } from "@src/types/navigationTypes";

const CollectionStack =
  createStackNavigator<CollectionStackParamList>();

const CollectionNavigator: React.FC = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPresets.ModalPresentationIOS,
  };

  return (
    <CollectionStack.Navigator
      screenOptions={screenOptions}
    >
      <CollectionStack.Screen
        name="Collection"
        component={Collection}
      />
      <CollectionStack.Screen
        name="Word Details"
        component={WordInfoScreen}
      />
      <CollectionStack.Screen
        name="Edit Solutions"
        component={EditTicketScreen}
      />
      <CollectionStack.Screen
        name="Statistics"
        component={StatsScreen}
      />
      <CollectionStack.Screen
        name="Progress"
        component={ProgressScreen}
      />
      <CollectionStack.Screen
        name="Dictionary Lookup"
        component={DictionaryLookupScreen}
      />
      <CollectionStack.Screen
        name="Dictionary Selection"
        component={DictionarySelectionScreen}
      />
    </CollectionStack.Navigator>
  );
};

export default CollectionNavigator;
