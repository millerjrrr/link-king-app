import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationOptions,
} from "@react-navigation/stack";
import DictionarySelectionScreen from "../../screens/Options/DictionarySelectionScreen";
import WordInfoScreen from "@src/screens/Collection/WordInfoScreen";
import Collection from "@src/screens/Collection";
import StatsScreen from "@src/screens/Collection/StatsScreen";
import ProgressScreen from "@src/screens/Collection/ProgressScreen";
import DictionaryLookupScreen from "@src/screens/Collection/DictionaryLookupScreen";
import { CollectionStackParamList } from "@src/types/navigationTypes";
import EditTicketScreen from "@src/screens/Collection/EditTicketScreen";
import AIStories from "@src/screens/Collection/AIStories";
import CreateCustomTicketScreen from "@src/screens/Collection/CreateCustomTicketScreen";

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
        name="Create Custom Ticket"
        component={CreateCustomTicketScreen}
      />
      <CollectionStack.Screen
        name="Statistics"
        component={StatsScreen}
      />
      <CollectionStack.Screen
        name="AI Stories"
        component={AIStories}
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
