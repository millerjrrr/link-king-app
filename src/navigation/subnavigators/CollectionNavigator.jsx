import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Collection from "../../views/Collection";
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
    </CollectionStack.Navigator>
  );
};

export default CollectionNavigator;