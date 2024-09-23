import { Linking, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appShadow from "../../utils/appShadow";
import AppText from "../../ui/AppText";

const SolutionItem = ({ solution, red }) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const languageCode = "test";
  appLang.slice(0, 2);

  const color = red
    ? colors[colorScheme].RED
    : colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  const url = `https://www.google.com/search?q=define+${solution}&hl=${languageCode}`;
  const onPress = () => Linking.openURL(url);

  return (
    <TouchableOpacity
      {...{
        style: {
          backgroundColor,
          marginHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          borderRadius: 20,
          shadowColor: color,
          borderColor: color,
          height: 40,
          ...appShadow(1),
        },
        onPress,
      }}
    >
      <AppText
        {...{
          style: red
            ? { color: colors[colorScheme].RED }
            : null,
        }}
      >
        {solution}
      </AppText>
    </TouchableOpacity>
  );
};

export default SolutionItem;
