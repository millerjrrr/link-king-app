import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../views/auth/SignIn";
import LostPassword from "../views/auth/LostPassword";
import CheckYourEmail from "../views/auth/CheckYourEmail";
import Email from "../views/auth/SignUp/Email";
import Name from "../views/auth/SignUp/Name";
import Password from "../views/auth/SignUp/Password";
import Welcome from "../views/auth/SignUp/Welcome";
import colors from "../utils/colors";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const headerTintColor = colors.dark.CONTRAST[0];
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Name" component={Name} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="LostPassword"
        component={LostPassword}
      />
      <Stack.Screen
        name="CheckYourEmail"
        component={CheckYourEmail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
