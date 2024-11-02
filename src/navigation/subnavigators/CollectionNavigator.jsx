import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import StatsScreen from "../../collection/StatsScreen";
import DictionarySelectionScreen from "../../options/DictionarySelectionScreen";
import ProgressScreen from "../../collection/ProgressScreen";
import WordInfoScreen from "../../collection/WordInfoScreen";
import EditTicketScreen from "../../collection/WordInfoScreen/EditTicketScreen";
import Collection from "../../screens/Collection";

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
        name="DictionarySelectionScreen"
        component={DictionarySelectionScreen}
      />
    </CollectionStack.Navigator>
  );
};

export default CollectionNavigator;
