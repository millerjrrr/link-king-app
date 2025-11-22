import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectConsoleLocals } from "@src/store/console";
import AppText from "@src/components/AppText";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

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
            fontSize: base * 25,
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
    height: base * 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: base * 35,
  },
  fakeSolution: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: base * 13,
    borderRadius: base * 20,
    height: base * 40,
  },
});

export default UserAttempt;
