import { StyleSheet, TouchableOpacity } from "react-native";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import FlagImage from "../Graphics/FlagImage";
import { settingsState } from "@src/store/settings";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CollectionStackParamList,
  ConsoleStackParamList,
  OptionsStackParamList,
} from "@src/types/navigationTypes";

const FlagBook: React.FC<{ padding: boolean }> = ({
  padding,
}) => {
  const { dictionary } = useSelector(selectConsoleState);
  const { appLang } = useSelector(settingsState);
  const [flag1, flag2] = [
    appLang,
    languageNameCodeMap[dictionary],
  ];
  const navigation = useNavigation();
  const route = useRoute();
  const onPress = () => {
    if (route.name.startsWith("Console")) {
      (
        navigation as StackNavigationProp<ConsoleStackParamList>
      ).navigate("Dictionary Selection");
    } else if (route.name.startsWith("Collection")) {
      (
        navigation as StackNavigationProp<CollectionStackParamList>
      ).navigate("Dictionary Selection");
    } else if (route.name.startsWith("Options")) {
      (
        navigation as StackNavigationProp<OptionsStackParamList>
      ).navigate("Dictionary Selection");
    }
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
      <FlagImage flag1={flag1} flag2={flag2} />
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
