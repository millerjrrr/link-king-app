import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getCollectionState } from "../store/collection";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import { getSettingsState } from "../store/settings";

const TicketsCount = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

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
    marginBottom: 5,
    height: 15,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TicketsCount;
