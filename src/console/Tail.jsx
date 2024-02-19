import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const TailEntry = ({ text, fontSize, opacity, color }) => {
  return (
    <Text
      style={[styles.tail, { fontSize, opacity, color }]}
    >
      {text}
    </Text>
  );
};

const Tail = () => {
  const { tail, showSolution, golden } =
    useSelector(getConsoleState);

  return !showSolution ? (
    <View style={styles.container}>
      {tail[0] ? (
        <TailEntry
          text={tail[0]}
          fontSize={40}
          opacity={0.6}
          color={colors.CONTRAST[golden]}
        />
      ) : null}
      {tail[1] ? (
        <TailEntry
          text={tail[1]}
          fontSize={30}
          opacity={0.4}
          color={colors.CONTRAST[golden]}
        />
      ) : null}
      {tail[2] ? (
        <TailEntry
          text={tail[2]}
          fontSize={25}
          opacity={0.25}
          color={colors.CONTRAST[golden]}
        />
      ) : null}
      {tail[3] ? (
        <TailEntry
          text={tail[3]}
          fontSize={22}
          opacity={0.1}
          color={colors.CONTRAST[golden]}
        />
      ) : null}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignItems: "center",
  },
});

export default Tail;
