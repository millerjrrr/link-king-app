import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";

const LevelRow = ({ number, lbd }) => {
  return lbd[number - 1] ? (
    <View style={styles.row}>
      <Text style={[styles.cell, { textAlign: "right" }]}>
        Level {number}:
      </Text>
      <Text style={[styles.cell, { textAlign: "left" }]}>
        {lbd[number].frequency}
      </Text>
    </View>
  ) : null;
};

const Levels = ({ lbd }) => {
  const array = Array.from({ length: 10 });

  return (
    <View style={styles.table}>
      {/* {array.map((_, index) => (
      <LevelRow number={index + 1} lbd={lbd} />
      ))} */}
      <LevelRow number={1} lbd={lbd} />
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffff",
    color: colors.CONTRAST,
    padding: 10,
    fontSize: 30,
  },
});

export default Levels;
