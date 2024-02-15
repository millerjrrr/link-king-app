import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CollectionNavigator from "./subnavigators/CollectionNavigator";
import Options from "../views/Options";
import Console from "../views/Console";
import Stats from "../views/Stats";
import colors from "../utils/colors";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          borderTopWidth: 0,
        },
      }}
      // initialRouteName="ConsoleScreen"
    >
      <Tab.Screen
        name="StatsScreen"
        component={Stats}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons
              name="query-stats"
              size={props.size + 15}
              color={props.color}
            />
          ),
          tabBarLabel: "Stats",
        }}
      />
      <Tab.Screen
        name="ConsoleScreen"
        component={Console}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name="game-controller"
              size={props.size + 15}
              color={props.color}
            />
          ),
          tabBarLabel: "Console",
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Collection"
        component={CollectionNavigator}
        options={{
          tabBarIcon: (props) => (
            <Entypo
              name="open-book"
              size={props.size + 15}
              color={props.color}
            />
          ),
          tabBarLabel: "Collection",
        }}
      />
      <Tab.Screen
        name="Options"
        component={Options}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons
              name="settings"
              size={props.size + 15}
              color={props.color}
            />
          ),
          tabBarLabel: "Options",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
