import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import DictionarySelectionScreen from "@src/screens/Options/DictionarySelectionScreen";
import ChooseALanguageToStudy from "@src/screens/walkthrough/ChooseALanguageToStudy";
import ChooseHomeLanguage from "@src/screens/walkthrough/ChooseHomeLanguage";
import SelectAndChangeHomeLanguage from "@src/screens/walkthrough/SelectAndChangeHomeLanguage";
import Welcome from "@src/screens/walkthrough/Welcome";
import WrittenInstructions from "@src/screens/walkthrough/WrittenInstructions";
import YoureAllSet from "@src/screens/walkthrough/YoureAllSet";
import { WalkthroughStackParamList } from "@src/types/navigationTypes";

const Stack =
  createStackNavigator<WalkthroughStackParamList>();

const WalkthroughNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="Choose Home Language"
        component={ChooseHomeLanguage}
      />
      <Stack.Screen
        name="Choose a Language to Study"
        component={ChooseALanguageToStudy}
      />
      <Stack.Screen
        name="You're all set!"
        component={YoureAllSet}
      />
      <Stack.Screen
        name="How to Play"
        component={WrittenInstructions}
      />
      <Stack.Screen
        name="Select New Home Language"
        component={SelectAndChangeHomeLanguage}
        options={{
          presentation: "modal",
          cardStyleInterpolator:
            CardStyleInterpolators.forVerticalIOS,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="Choose a Dictionary"
        component={DictionarySelectionScreen}
        options={{
          presentation: "modal",
          cardStyleInterpolator:
            CardStyleInterpolators.forVerticalIOS,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default WalkthroughNavigator;
