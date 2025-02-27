import { Image, TouchableOpacity } from "react-native";
import AppText from "@src/components/AppText";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import getImageSource from "@src/utils/getImageSource";
import appTextSource from "@src/utils/appTextSource";
import { useNavigation } from "@react-navigation/native";
import { TabParamList } from "@src/types/navigationTypes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

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
