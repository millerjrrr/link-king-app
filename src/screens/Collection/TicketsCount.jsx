import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { collectionState } from "@src/store/collection";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import AppText from "@src/components/AppText";

const TicketsCount = () => {
  const { results, busy } = useSelector(collectionState);
  return (
    <View style={styles.container}>
      <BusyWrapper {...{ busy, size: 10 }}>
        <AppText style={styles.text}>{results}</AppText>
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
  },
});

export default TicketsCount;
