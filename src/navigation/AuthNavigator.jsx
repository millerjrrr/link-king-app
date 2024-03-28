import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/SignUp";
import LostPassword from "../views/auth/LostPassword";
import CheckYourEmail from "../views/auth/CheckYourEmail";
import { StatusBar } from "react-native";
import colors from "../utils/colors";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="LostPassword"
        component={LostPassword}
      />
      <Stack.Screen
        name="CheckYourEmail"
        component={CheckYourEmail}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
