import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LostPassword from "../views/auth/LostPassword";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/SignUp";
import { getAuthState } from "../store/auth";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const authState = useSelector(getAuthState);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="LostPassword"
        component={LostPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
