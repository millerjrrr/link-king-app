import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "@auth/SignUp/Welcome";
import NameScreen from "@auth/SignUp/NameScreen";
import Email from "@auth/SignUp/Email";
import Password from "@auth/SignUp/Password";
import VerificationCode from "@auth/SignUp/VerificationCode";
import LostPassword from "@auth/LostPassword/LostPassword";
import CheckYourEmail from "@auth/LostPassword/CheckYourEmail";
import SignIn from "@auth/SignIn";
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
