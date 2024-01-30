import { StyleSheet } from "react-native";
import SafeAreaAndroid from "../utils/SafeAreaAndroid";

const AppContainer = ({ children }) => {
  return (
    <SafeAreaAndroid style={styles.container}>
      {children}
    </SafeAreaAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
