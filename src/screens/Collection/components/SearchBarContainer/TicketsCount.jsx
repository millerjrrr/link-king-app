import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { collectionState } from "@src/store/collection";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import AppText from "@src/components/AppText";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const TicketsCount = () => {
  const { results, busy } = useSelector(collectionState);
  return (
    <View style={styles.container}>
      <BusyWrapper {...{ busy, size: base * 10 }}>
        <AppText style={styles.text}>{results}</AppText>
      </BusyWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: base * 5,
    height: base * 15,
  },
  text: {
    fontSize: base * 10,
    fontWeight: "bold",
  },
});

export default TicketsCount;
