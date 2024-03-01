import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { getCollectionState } from "../store/collection";
import Loader from "../ui/Loaders/Loader";

const TicketsCount = () => {
  const { golden } = useSelector(getConsoleState);
  const { results } = useSelector(getCollectionState);
  return (
    <View style={styles.container}>
      {!results ? (
        <Loader size={10} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: colors.CONTRAST[golden] },
          ]}
        >
          {results}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 5,
    height: 15,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TicketsCount;
