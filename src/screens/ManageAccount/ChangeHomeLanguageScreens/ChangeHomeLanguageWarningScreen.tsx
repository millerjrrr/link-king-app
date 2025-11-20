import { useSelector } from "react-redux";
import PopUpContainer from "../../../components/Containers/PopUpsContainer";
import { settingsState } from "@src/store/settings";
import { useNavigation } from "@react-navigation/native";
import AuthButton from "../../../components/Buttons/AuthButton";
import appTextSource from "@src/utils/appTextSource";
import AppText from "../../../components/AppText";
import { View } from "react-native";
import { ManageAccountStackParamList } from "@src/types/navigationTypes";
import screenDimensions from "@src/utils/screenDimensions";
import { StackNavigationProp } from "@react-navigation/stack";
const { base } = screenDimensions();

const ChangeHomeLanguageWarningScreen = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ManageAccountStackParamList>
    >();

  const { appLang } = useSelector(settingsState);

  const {
    changeHomeLanguage: heading,
    changeHomeLanguageWarning,
    continue: title,
  } = appTextSource(appLang).options.manageAccount;

  return (
    <PopUpContainer {...{ heading, padding: base * 15 }}>
      <AppText>{changeHomeLanguageWarning}</AppText>
      <View style={{ height: 50 }} />
      <AuthButton
        {...{
          title,
          busy: false,
          onPress: () =>
            navigation.navigate(
              "Select New Home Language",
              { unprotect: false }
            ),
        }}
      />
    </PopUpContainer>
  );
};

export default ChangeHomeLanguageWarningScreen;
