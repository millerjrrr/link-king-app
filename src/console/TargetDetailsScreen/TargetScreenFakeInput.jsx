import {
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const TargetScreenFakeInput = () => {
  const { lastAttempt } = useSelector(getConsoleState);
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const { SECONDARY, RED } = colors[colorScheme];

  const { timedOut } =
    appTextSource[appLang].console.targetDetails;

  return (
    <View
      style={[
        styles.container,
        {
          color: RED,
          backgroundColor: SECONDARY,
          shadowColor: RED,
        },
      ]}
    >
      <Text style={[styles.text, { color: RED }]}>
        {lastAttempt ? lastAttempt : timedOut}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "100%",
    height: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 35,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    zIndex: 1,
    fontSize: 40,
    textDecorationLine: "line-through",
  },
});

export default TargetScreenFakeInput;
