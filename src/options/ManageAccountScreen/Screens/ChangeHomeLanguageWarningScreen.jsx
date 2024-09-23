import { useSelector } from "react-redux";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import { getSettingsState } from "../../../store/settings";
import { useNavigation } from "@react-navigation/native";
import AuthButton from "./../../../ui/Buttons/AuthButton";
import appTextSource from "../../../utils/appTextSource";
import AppText from "../../../ui/AppText";
import { View } from "react-native";

const ChangeHomeLanguageWarningScreen = () => {
  const navigation = useNavigation();

  const { appLang } = useSelector(getSettingsState);

  const {
    changeHomeLanguage: heading,
    changeHomeLanguageWarning,
    continue: title,
  } = appTextSource(appLang).options.manageAccount;

  return (
    <PopUpContainer
      {...{ heading, blockPopToTop: true, padding: 15 }}
    >
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
