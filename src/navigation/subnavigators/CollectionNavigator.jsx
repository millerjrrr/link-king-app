import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Collection from "../../views/Collection";
import LevelBreakdownScreen from "../../collection/LevelBreakdownScreen";
import StatsScreen from "../../collection/StatsScreen";
import DeleteScreen from "../../collection/DeleteScreen";

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
        name="StatsScreen"
        component={StatsScreen}
      />
    </CollectionStack.Navigator>
  );
};

export default CollectionNavigator;
