import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dictionary from "../views/Dictionary";
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
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          borderTopWidth: 0,
        },
      }}
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
        name="Dictionary"
        component={Dictionary}
        options={{
          tabBarIcon: (props) => (
            <Entypo
              name="open-book"
              size={props.size + 15}
              color={props.color}
            />
          ),
          tabBarLabel: "Dictionary",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
