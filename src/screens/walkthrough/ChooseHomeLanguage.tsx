import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AuthButton from "@components/Buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import AppLink from "@src/components/AppLink";
import FlagImage from "@src/components/Graphics/FlagImage";
import AppText from "@src/components/AppText";
import { languages } from "./../ManageAccount/ChangeHomeLanguageScreens/SelectNewLanguageScreen/getLanguageData";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalkthroughStackParamList } from "@src/types/navigationTypes";
import appTextSource from "@src/utils/appTextSource";

const ChooseHomeLanguage = () => {
  const { appLang } = useSelector(settingsState);
  const { nativeName } =
    languages[appLang as keyof typeof languages];

  const navigation =
    useNavigation<
      StackNavigationProp<WalkthroughStackParamList>
    >();

  const onPress = async () => {
    navigation.navigate("Choose a Language to Study");
  };

  const changeLanguage = async () => {
    navigation.navigate("Select New Home Language");
  };

  const { heading, subHeading, buttonTitle, linkTitle } =
    appTextSource(appLang).walkthrough[
      "Choose Home Language"
    ];

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
      back={false}
      nologo
    >
      <TouchableOpacity
        onPress={changeLanguage}
        style={{ alignItems: "center", width: "100%" }}
      >
        <FlagImage flag1={appLang} scale={3} />
        <View style={{ height: 10 }} />
        <AppText>{nativeName}</AppText>
        <View style={{ height: 20 }} />
        <AuthButton
          title={buttonTitle}
          busy={false}
          onPress={onPress}
        />
        <AppLink
          title={linkTitle || "Change Home Language"}
          onPress={changeLanguage}
        />
      </TouchableOpacity>
    </AuthFormContainer>
  );
};

export default ChooseHomeLanguage;
