import { StyleSheet, Text } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { getCollectionState } from "../store/collection";
import Loader from "../ui/Loader";

const TicketsCount = () => {
  const { golden } = useSelector(getConsoleState);
  const { results } = useSelector(getCollectionState);
  return !results ? (
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
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 5,
  },
});

export default TicketsCount;
