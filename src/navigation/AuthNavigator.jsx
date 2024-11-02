import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/auth/SignUp/Welcome";
import Name from "../screens/auth/SignUp/Name";
import Email from "../screens/auth/SignUp/Email";
import Password from "../screens/auth/SignIn";
import VerificationCode from "./../screens/auth/SignUp/VerificationCode";
import LostPassword from "./../screens/auth/LostPassword/LostPassword";
import CheckYourEmail from "./../screens/auth/LostPassword/CheckYourEmail";
import SignIn from "../screens/auth/SignIn";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Name" component={Name} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCode}
      />
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
