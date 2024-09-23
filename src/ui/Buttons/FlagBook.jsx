import { StyleSheet, TouchableOpacity } from "react-native";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { useNavigation } from "@react-navigation/native";
import FlagImage from "../Graphics/FlagImage";
import { getSettingsState } from "../../store/settings";
import languageNameCodeMap from "../../utils/languageNameCodeMap";

const FlagBook = ({ padding }) => {
  const { dictionary } = useSelector(getConsoleState);
  const { appLang } = useSelector(getSettingsState);
  const [flag1, flag2] = [
    appLang,
    languageNameCodeMap[dictionary],
  ];
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("DictionarySelectionScreen");
  };

  return (
    <TouchableOpacity
      {...{
        onPress,
        style: [
          styles.container,
          { paddingVertical: padding ? 5 : 15 },
        ],
      }}
    >
      {padding ? <StatusBarFiller /> : null}
      <FlagImage {...{ flag1, flag2 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default FlagBook;
