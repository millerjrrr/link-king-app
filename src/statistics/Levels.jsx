import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";

const LevelRow = ({ number, lbd }) => {
  return lbd.length >= number ? (
    <View style={styles.row}>
      <Text style={[styles.cell, { textAlign: "right" }]}>
        Level {number}:
      </Text>
      <Text style={[styles.cell, { textAlign: "center" }]}>
        {lbd[number - 1].frequency}
      </Text>
    </View>
  ) : null;
};

const Levels = ({ lbd }) => {
  const array = Array.from({ length: 10 });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={styles.title}>Levels Breakdown</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.table}>
          {array.map((_, index) => (
            <LevelRow
              key={index}
              number={index + 1}
              lbd={lbd}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.CONTRAST,
    fontSize: 50,
    marginTop: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    margin: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    color: colors.CONTRAST,
    padding: 5,
    fontSize: 30,
  },
});

export default Levels;
