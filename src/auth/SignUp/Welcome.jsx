import { View } from "react-native";
import AuthFormContainer from "../../components/containers/AuthFormContainer";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AuthButton from "../../components/Buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import SignUpAppLink from "../../components/SignUpAppLink";

const Welcome = () => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const navigation = useNavigation();

  const onPress = async () => {
    navigation.navigate("Name");
  };

  const { heading, subHeading, buttonTitle } =
    appTextSource(appLang).auth.signUp.start;

  return (
    <AuthFormContainer
      {...{
        heading,
        subHeading,
        back: false,
      }}
    >
      <MaterialCommunityIcons
        {...{
          name: "account-arrow-right-outline",
          size: 100,
          color,
        }}
      />
      <View style={{ height: 20 }} />
      <AuthButton
        {...{ title: buttonTitle, busy: false, onPress }}
      />
      <SignUpAppLink />
    </AuthFormContainer>
  );
};

export default Welcome;