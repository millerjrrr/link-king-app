import { View } from "react-native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AuthButton from "@components/Buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import SignUpAppLink from "@components/SignUpAppLink";
import AuthFormContainer from "@src/components/containers/AuthFormContainer";
import Auth3PButtons from "@src/components/Auth3P/Auth3PButtons";
import BusyWrapper from "../../../components/Loader/BusyWrapper";
import { authState } from "../../../store/auth";
import { AuthStackNavProp } from "@src/types/navigationTypes";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Welcome = () => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const { busy } = useSelector(authState);

  const navigation = useNavigation<AuthStackNavProp>();

  const onPress = async () => {
    navigation.navigate("Name", {});
  };

  const { heading, subHeading, buttonTitle } =
    appTextSource(appLang).auth.signUp.start;

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
      back={false}
    >
      <BusyWrapper busy={busy} size={base * 150}>
        <MaterialCommunityIcons
          name={"account-arrow-right-outline"}
          size={base * 100}
          color={color}
        />
        <View style={{ height: base * 20 }} />
        <AuthButton
          title={buttonTitle}
          busy={false}
          onPress={onPress}
        />
        <SignUpAppLink />
      </BusyWrapper>
      <Auth3PButtons />
    </AuthFormContainer>
  );
};

export default Welcome;
