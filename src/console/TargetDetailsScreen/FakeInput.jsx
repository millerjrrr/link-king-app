import {
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";

const FakeInput = () => {
  const { lastAttempt } = useSelector(getConsoleState);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {lastAttempt
          ? " " + lastAttempt + " "
          : "timed out!"}
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
    backgroundColor: colors.SECONDARY,
    color: colors.RED,
    shadowColor: colors.RED,
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
    color: colors.RED,
    fontSize: 40,
    textDecorationLine: "line-through",
  },
});

export default FakeInput;
