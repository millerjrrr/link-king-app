import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../views/Home";
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
        tabBarStyle: { backgroundColor: colors.PRIMARY },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: (props) => (
            <Entypo
              name="home"
              size={props.size}
              color={props.color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ConsoleScreen"
        component={Console}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name="game-controller"
              size={props.size}
              color={props.color}
            />
          ),
          tabBarLabel: "Console",
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="StatsScreen"
        component={Stats}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons
              name="query-stats"
              size={props.size}
              color={props.color}
            />
          ),
          tabBarLabel: "Stats",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
