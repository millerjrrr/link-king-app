import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Collection from "../../views/Collection";
import StatsScreen from "../../collection/StatsScreen";
import DeleteScreen from "../../collection/DeleteScreen";
import DictionarySelectionScreen from "../../options/DictionarySelectionScreen";
import ProgressScreen from "../../collection/ProgressScreen";

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
        name="DeleteScreen"
        component={DeleteScreen}
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
