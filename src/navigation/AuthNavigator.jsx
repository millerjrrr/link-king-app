import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "@src/auth/SignUp/Welcome";
import Name from "@src/auth/SignUp/Name";
import Email from "@src/auth/SignUp/Email";
import Password from "@src/auth/SignUp/Password";
import VerificationCode from "@src/auth/SignUp/VerificationCode";
import LostPassword from "@src/auth/LostPassword/LostPassword";
import CheckYourEmail from "@src/auth/LostPassword/CheckYourEmail";
import SignIn from "@src/auth/SignIn";

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
