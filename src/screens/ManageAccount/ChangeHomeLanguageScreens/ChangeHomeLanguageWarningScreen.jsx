import { useSelector } from "react-redux";
import PopUpContainer from "../../../components/Containers/PopUpContainer";
import { settingsState } from "@src/store/settings";
import { useNavigation } from "@react-navigation/native";
import AuthButton from "../../../components/Buttons/AuthButton";
import appTextSource from "@src/utils/appTextSource";
import AppText from "../../../components/AppText";
import { View } from "react-native";

const ChangeHomeLanguageWarningScreen = () => {
  const navigation = useNavigation();

  const { appLang } = useSelector(settingsState);

  const {
    changeHomeLanguage: heading,
    changeHomeLanguageWarning,
    continue: title,
  } = appTextSource(appLang).options.manageAccount;

  return (
    <PopUpContainer {...{ heading, padding: 15 }}>
      <AppText>{changeHomeLanguageWarning}</AppText>
      <View {...{ style: { height: 50 } }} />
      <AuthButton
        {...{
          title,
          busy: false,
          onPress: () =>
            navigation.navigate(
              "SelectNewHomeLanguageScreen",
            ),
        }}
      />
    </PopUpContainer>
  );
};

export default ChangeHomeLanguageWarningScreen;
