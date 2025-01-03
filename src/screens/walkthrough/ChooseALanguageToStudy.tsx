import { View } from "react-native";
import { useSelector } from "react-redux";
import AuthButton from "@components/Buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import AppLink from "@src/components/AppLink";
import FlagImage from "@src/components/Graphics/FlagImage";
import AppText from "@src/components/AppText";
import { selectConsoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalkthroughStackParamList } from "@src/types/navigationTypes";

const ChooseALanguageToStudy = () => {
  const { appLang } = useSelector(settingsState);
  const { dictionary } = useSelector(selectConsoleState);

  const navigation =
    useNavigation<
      StackNavigationProp<WalkthroughStackParamList>
    >();

  const onPress = async () => {
    navigation.navigate("You're all set!");
  };

  const changeStudyLanguage = async () => {
    navigation.navigate("Choose a Dictionary");
  };

  const { heading, subHeading, buttonTitle, linkTitle } =
    appTextSource(appLang).walkthrough[
      "Choose a Language to Study"
    ];

  const name =
    appTextSource(appLang).options.chooseDictionary[
      dictionary as keyof typeof appTextSource
    ] || dictionary;

  return (
    <AuthFormContainer
      heading={heading}
      subHeading={subHeading}
      nologo
    >
      <View style={{ alignItems: "center", width: "100%" }}>
        <FlagImage
          flag1={appLang}
          flag2={languageNameCodeMap[dictionary]}
          scale={3}
        />
        <View style={{ height: 10 }} />
        <AppText>{name}</AppText>
        <View style={{ height: 20 }} />
        <AuthButton
          title={buttonTitle}
          busy={false}
          onPress={onPress}
        />
        <View style={{ height: 20 }} />
        <AppLink
          title={linkTitle}
          onPress={changeStudyLanguage}
        />
      </View>
    </AuthFormContainer>
  );
};

export default ChooseALanguageToStudy;
