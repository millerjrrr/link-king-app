import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const LevelRow = ({ number, lbd, fontSize }) => {
  const { golden } = useSelector(getConsoleState);
  return lbd.length >= number ? (
    <View style={styles.row}>
      <Text
        style={[
          styles.cell,
          {
            color: colors.CONTRAST[golden],
            textAlign: "right",
            fontSize: (fontSize * 5) / lbd.length,
          },
        ]}
      >
        Level {number}:
      </Text>
      <Text
        style={[
          styles.cell,
          {
            color: colors.CONTRAST[golden],
            textAlign: "left",
            fontSize: (fontSize * 5) / lbd.length,
          },
        ]}
      >
        {lbd[number - 1].frequency}
      </Text>
    </View>
  ) : null;
};

const LevelLine = ({ level, height }) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
      }}
    >
      <View
        style={{
          height: height,
          width: 2,
          borderColor: colors.CONTRAST[golden],
          borderWidth: 2,
          margin: 5,
        }}
      />
      <Text
        style={{
          color: colors.CONTRAST[golden],
          fontSize: 20,
        }}
      >
        {level}
      </Text>
    </View>
  );
};

const HistoGram = ({ lbd, histHeight }) => {
  const heights = lbd.map((row) => row.frequency);
  let maxHeight = heights[0];
  heights.forEach((h) => {
    if (h > maxHeight) maxHeight = h;
  });

  const normalizedHeights = heights.map(
    (h) => (h * histHeight) / maxHeight,
  );

  return (
    <View
      style={{
        flexDirection: "row",

        alignItems: "flex-end",
      }}
    >
      {normalizedHeights.map((_, index) => (
        <LevelLine
          key={index}
          level={index + 1}
          height={normalizedHeights[index]}
        />
      ))}
    </View>
  );
};

const Levels = ({ lbd }) => {
  const { golden } = useSelector(getConsoleState);
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
        <Text
          style={[
            styles.title,
            { color: colors.CONTRAST[golden] },
          ]}
        >
          Levels Breakdown
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          <HistoGram lbd={lbd} histHeight={200} />
        </View>
        <View style={styles.table}>
          {array.map((_, index) => (
            <LevelRow
              key={index}
              number={index + 1}
              lbd={lbd}
              fontSize={30}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
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
    padding: 5,
  },
});

export default Levels;
