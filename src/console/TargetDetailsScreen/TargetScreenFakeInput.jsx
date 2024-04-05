import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import appShadow from "../../utils/appShadow";

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
          borderColor: RED,
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 35,
    ...appShadow(),
  },
  text: {
    zIndex: 1,
    fontSize: 40,
    textDecorationLine: "line-through",
  },
});

export default TargetScreenFakeInput;
