import { Image, TouchableOpacity } from "react-native";
import AppText from "../../ui/AppText";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import getImageSource from "../../utils/getImageSource";
import appTextSource from "../../utils/appTextSource";
import { useNavigation } from "@react-navigation/native";

const ChangeHomeLanguageLabel = () => {
  const { appLang } = useSelector(getSettingsState);
  const { changeHomeLanguage } =
    appTextSource(appLang).options.chooseDictionary;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ManageAccountNavigator");
    navigation.navigate("Options");
    setTimeout(
      () => navigation.navigate("ManageAccountNavigator"),
      1000,
    );
  };

  return (
    <TouchableOpacity
      {...{
        onPress,
        style: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 30,
        },
      }}
    >
      <Image
        {...{
          source: getImageSource(appLang),
          resizeMode: "contain",
          style: {
            width: 30,
            height: 30,
          },
        }}
      />
      <AppText
        {...{
          style: {
            fontSize: 18,
            padding: 5,
          },
        }}
      >
        {changeHomeLanguage}
      </AppText>
    </TouchableOpacity>
  );
};

export default ChangeHomeLanguageLabel;
