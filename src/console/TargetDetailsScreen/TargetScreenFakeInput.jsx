import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import appShadow from "../../utils/appShadow";
import AppText from "../../ui/AppText";

const TargetScreenFakeInput = () => {
  const { lastAttempt } = useSelector(getConsoleState);
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const { SECONDARY, RED } = colors[colorScheme];

  const { timedOut } =
    appTextSource[appLang].console.targetDetails;

  //font-size management
  const fakeFormValue = lastAttempt
    ? lastAttempt
    : timedOut;

  let fontSize = 40;
  const length = fakeFormValue.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

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
      <AppText
        style={[styles.text, { color: RED, fontSize }]}
      >
        {fakeFormValue}
      </AppText>
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
    textDecorationLine: "line-through",
  },
});

export default TargetScreenFakeInput;
