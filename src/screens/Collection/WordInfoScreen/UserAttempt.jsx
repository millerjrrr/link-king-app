import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { selectConsoleLocals } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import SolutionItem from "@src/screens/Console/components/SolutionsList/SolutionItem";
import appShadow from "@src/utils/appShadow";

const UserAttempt = () => {
  const { lastAttempt } = useSelector(selectConsoleLocals);
  const { colorScheme, appLang } =
    useSelector(settingsState);
  const { userResponse } =
    appTextSource(appLang).console.targetDetails;

  return lastAttempt ? (
    <View style={styles.container}>
      <View
        style={[
          styles.fakeSolution,
          {
            backgroundColor: colors[colorScheme].SECONDARY,
            shadowColor: colors[colorScheme].RED,
            borderColor: colors[colorScheme].RED,
          },
        ]}
      >
        <AppText
          style={{
            color: colors[colorScheme].RED,
            fontSize: 25,
          }}
        >
          {lastAttempt}
        </AppText>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 35,
  },
  fakeSolution: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 13,
    borderRadius: 20,
    height: 40,
    ...appShadow(1),
  },
});

export default UserAttempt;
