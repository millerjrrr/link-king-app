import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Collection from "../../views/Collection";
import LevelBreakdownScreen from "../../collection/LevelBreakdownScreen";
import StatsScreen from "../../collection/StatsScreen";
import DeleteScreen from "../../collection/DeleteScreen";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import { useSelector } from "react-redux";
import DictionarySelectionScreen from "../../options/DictionarySelectionScreen";

const CollectionStack = createStackNavigator();

const CollectionNavigator = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const headerTintColor =
    colors[colorScheme].CONTRAST[golden];
  return (
    <CollectionStack.Navigator
      screenOptions={{
        headerTintColor,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: "transparent",
        },
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
        name="LevelBreakdown"
        component={LevelBreakdownScreen}
      />
      <CollectionStack.Screen
        name="StatsScreen"
        component={StatsScreen}
      />
      <CollectionStack.Screen
        name="DictionarySelectionScreen"
        component={DictionarySelectionScreen}
      />
    </CollectionStack.Navigator>
  );
};

export default CollectionNavigator;
