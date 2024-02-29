import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CollectionNavigator from "./subnavigators/CollectionNavigator";
import OptionsNavigator from "./subnavigators/OptionsNavigator";
import ConsoleNavigator from "./subnavigators/ConsoleNavigator";
import colors from "../utils/colors";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { golden } = useSelector(getConsoleState);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            color: colors.CONTRAST[golden],
            shadowColor: colors.CONTRAST[golden],
          },
        ],
        tabBarLabelStyle: {
          fontSize: 15,
        },
      }}
      initialRouteName="Console"
    >
      <Tab.Screen
        name="Console"
        component={ConsoleNavigator}
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
        component={OptionsNavigator}
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

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.PRIMARY,
    height: 80,
    padding: 10,
    borderTopWidth: 0,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default TabNavigator;
