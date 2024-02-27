import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Collection from "../../views/Collection";
import DeleteScreen from "../../collection/DeleteScreen";
import LevelBreakdownScreen from "../../collection/LevelBreakdownScreen/LevelBreakdownScreen";
import StatsScreen from "../../collection/StatsScreen/StatsScreen";

const CollectionStack = createStackNavigator();

const CollectionNavigator = () => {
  return (
    <CollectionStack.Navigator
      screenOptions={{
        // headerShown: false,
        headerTransparent: true,
        headerTitleStyle: { color: "transparent" },
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CollectionStack.Screen
        name="WordsCollection"
        component={Collection}
      />
      <CollectionStack.Screen
        name="WordDetails"
        component={DeleteScreen}
      />
      <CollectionStack.Screen
        name="LevelBreakdown"
        component={LevelBreakdownScreen}
      />
      <CollectionStack.Screen
        name="TemperaryAlternativeName"
        component={StatsScreen}
      />
    </CollectionStack.Navigator>
  );
};

export default CollectionNavigator;
