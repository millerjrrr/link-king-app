import { Image, TouchableOpacity } from "react-native";
import AppText from "@src/components/AppText";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import getImageSource from "@src/utils/getImageSource";
import appTextSource from "@src/utils/appTextSource";
import { useNavigation } from "@react-navigation/native";

const ChangeHomeLanguageLabel = () => {
  const { appLang } = useSelector(settingsState);
  const { changeHomeLanguage } =
    appTextSource(appLang).options.chooseDictionary;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Manage Account:");
    navigation.navigate("Options");
    setTimeout(
      () => navigation.navigate("Manage Account:"),
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
