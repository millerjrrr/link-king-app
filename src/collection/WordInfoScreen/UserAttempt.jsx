import { View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import appShadow from "../../utils/appShadow";
import AppText from "../../ui/AppText";
import SolutionItem from "../../console/SolutionsList/SolutionItem";

const UserAttempt = () => {
  const { lastAttempt } = useSelector(getConsoleState);
  const { colorScheme } = useSelector(getSettingsState);
  const userResponse = "Your response:";
  // appTextSource[appLang].console.targetDetails;

  //font-size management
  const solution = "testtest";
  // lastAttempt;

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
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 35,
    ...appShadow(),
  },
});

export default UserAttempt;
