import { View, StyleSheet } from "react-native";
import Loader from "../ui/Loader";

const BusyWrapper = ({ children, busy }) => {
  return (
    <View style={styles.container}>
      {busy ? <Loader size={96} /> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
});

export default BusyWrapper;
