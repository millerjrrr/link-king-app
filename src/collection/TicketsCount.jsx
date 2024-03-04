import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { getCollectionState } from "../store/collection";
import BusyWrapper from "../ui/Loader/BusyWrapper";

const TicketsCount = () => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  const { results, busy } = useSelector(getCollectionState);
  return (
    <View style={styles.container}>
      <BusyWrapper {...{ busy, size: 10 }}>
        <Text style={[styles.text, { color }]}>
          {results}
        </Text>
      </BusyWrapper>
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
