import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "@src/store/console";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import SolutionItem from "@src/screens/Console/components/SolutionsList/SolutionItem";

const UserAttempt = () => {
  const { lastAttempt } = useSelector(getConsoleState);
  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const { userResponse } =
    appTextSource(appLang).console.targetDetails;

  const solution = lastAttempt;

  return (
    <View style={styles.container}>
      <AppText
        style={{
          color: colors[colorScheme].RED,
          fontSize: 20,
          paddingRight: 10,
        }}
      >
        {userResponse}
      </AppText>
      <SolutionItem {...{ solution, red: true }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 35,
  },
});

export default UserAttempt;
