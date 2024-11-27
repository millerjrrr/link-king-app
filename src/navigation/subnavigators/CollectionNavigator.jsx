import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import DictionarySelectionScreen from "../../screens/Options/DictionarySelectionScreen";
import WordInfoScreen from "@src/screens/Collection/WordInfoScreen";
import EditTicketScreen from "@src/screens/Collection/WordInfoScreen/EditTicketScreen";
import Collection from "@src/screens/Collection";
import StatsScreen from "@src/screens/Collection/StatsScreen";
import ProgressScreen from "@src/screens/Collection/ProgressScreen";
import DictionaryLookupScreen from "@src/screens/Collection/DictionaryLookupScreen";

const CollectionStack = createStackNavigator();

const CollectionNavigator = () => {
  return (
    <CollectionStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CollectionStack.Screen
        name="WordsCollection"
        component={Collection}
      />
      <CollectionStack.Screen
        name="WordInfoScreen"
        component={WordInfoScreen}
      />
      <CollectionStack.Screen
        name="EditTicketScreen"
        component={EditTicketScreen}
      />
      <CollectionStack.Screen
        name="StatsScreen"
        component={StatsScreen}
      />
      <CollectionStack.Screen
        name="ProgressScreen"
        component={ProgressScreen}
      />
      <CollectionStack.Screen
        name="DictionaryLookupScreen"
        component={DictionaryLookupScreen}
      />
      <CollectionStack.Screen
        name="DictionarySelectionScreen"
        component={DictionarySelectionScreen}
      />
    </CollectionStack.Navigator>
  );
};

export default CollectionNavigator;
