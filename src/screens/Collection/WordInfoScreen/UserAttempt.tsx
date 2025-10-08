import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectConsoleLocals } from "@src/store/console";
import AppText from "@src/components/AppText";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";

const UserAttempt = () => {
  const { lastAttempt } = useSelector(selectConsoleLocals);
  const { RED, SECONDARY } = useColors();

  return lastAttempt ? (
    <View style={styles.container}>
      <View
        style={[
          styles.fakeSolution,
          {
            backgroundColor: SECONDARY,
            ...appShadow(RED),
          },
        ]}
      >
        <AppText
          style={{
            color: RED,
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
  },
});

export default UserAttempt;
