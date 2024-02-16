import { View, StyleSheet } from "react-native";
import Loader from "../ui/Loader";
import InternetConnectionPage from "../errors/InternetConnectionPage";

const BusyWrapper = ({
  children,
  busy,
  connected,
  refresh,
}) => {
  return (
    <View style={styles.container}>
      {connected ? (
        busy ? (
          <Loader size={96} />
        ) : (
          children
        )
      ) : (
        <InternetConnectionPage refresh={refresh} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
});

export default BusyWrapper;
