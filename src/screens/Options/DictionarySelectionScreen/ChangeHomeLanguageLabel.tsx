import { Image, TouchableOpacity } from "react-native";
import AppText from "@src/components/AppText";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import getImageSource from "@src/utils/getImageSource";
import appTextSource from "@src/utils/appTextSource";
import { useNavigation } from "@react-navigation/native";
import { TabParamList } from "@src/types/navigationTypes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const ChangeHomeLanguageLabel = () => {
  const { appLang } = useSelector(settingsState);
  const { changeHomeLanguage } =
    appTextSource(appLang).options.chooseDictionary;
  const tabNavigation =
    useNavigation<BottomTabNavigationProp<TabParamList>>();
  const onPress = () => {
    tabNavigation.navigate("Manage Account:");
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: base * 30,
      }}
    >
      <Image
        {...{
          source: getImageSource(appLang),
          resizeMode: "contain",
          style: {
            width: base * 30,
            height: base * 30,
          },
        }}
      />
      <AppText
        {...{
          style: {
            fontSize: base * 18,
            padding: base * 5,
          },
        }}
      >
        {changeHomeLanguage}
      </AppText>
    </TouchableOpacity>
  );
};

export default ChangeHomeLanguageLabel;
