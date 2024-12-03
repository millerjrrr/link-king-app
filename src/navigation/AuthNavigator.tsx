import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "@src/auth/SignUp/Welcome";
import NameScreen from "@src/auth/SignUp/NameScreen";
import Email from "@src/auth/SignUp/Email";
import Password from "@src/auth/SignUp/Password";
import VerificationCode from "@src/auth/SignUp/VerificationCode";
import LostPassword from "@src/auth/LostPassword/LostPassword";
import CheckYourEmail from "@src/auth/LostPassword/CheckYourEmail";
import SignIn from "@src/auth/SignIn";
import { AuthStackParamList } from "@src/types/navigationTypes";

const Stack =
  createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen
        name="Verification Code"
        component={VerificationCode}
      />
      <Stack.Screen
        name="Lost Password"
        component={LostPassword}
      />
      <Stack.Screen
        name="Check Your Email"
        component={CheckYourEmail}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
