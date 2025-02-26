import { View } from "react-native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AuthButton from "@components/Buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import useColors from "@src/hooks/utilityHooks/useColors";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalkthroughStackParamList } from "@src/types/navigationTypes";
import appTextSource from "@src/utils/appTextSource";

const Welcome = () => {
  const { appLang } = useSelector(settingsState);
  const { CONTRAST: color } = useColors();

  const navigation =
    useNavigation<
      StackNavigationProp<WalkthroughStackParamList>
    >();

  const onPress = async () => {
    navigation.navigate("Choose Home Language");
  };

  const { heading, subHeading, buttonTitle } =
    appTextSource(appLang).walkthrough.Welcome;

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
      back={false}
    >
      <View style={{ height: 40 }} />
      <Feather name={"settings"} size={100} color={color} />
      <View style={{ height: 60 }} />
      <AuthButton
        title={buttonTitle}
        busy={false}
        onPress={onPress}
      />
    </AuthFormContainer>
  );
};

export default Welcome;
