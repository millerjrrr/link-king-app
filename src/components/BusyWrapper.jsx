import { View, StyleSheet } from "react-native";
import InternetConnectionPage from "../errors/InternetConnectionPage";
import Loader from "../ui/Loaders/Loader";

const BusyWrapper = ({
  children,
  busy,
  connected,
  refresh,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
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
