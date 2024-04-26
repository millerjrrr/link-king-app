import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../views/auth/SignIn";
import LostPassword from "../views/auth/LostPassword/LostPassword";
import CheckYourEmail from "../views/auth/LostPassword/CheckYourEmail";
import Welcome from "../views/auth/SignUp/Welcome";
import Name from "../views/auth/SignUp/Name";
import Email from "../views/auth/SignUp/Email";
import Password from "../views/auth/SignUp/Password";
import VerificationCode from "../views/auth/SignUp/VerificationCode";
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
          color: "#ffffff00",
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Name" component={Name} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCode}
        options={{ headerShown: false }}
      />
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
