import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import colors from "../utils/colors";
import Loader from "./Loader";

const AppButton = ({ title, busy, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.buttonContainer}
      >
        {!busy ? (
          <Text style={styles.text}>{title}</Text>
        ) : (
          <Loader />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
  buttonContainer: {
    width: "60%",
    aspectRatio: 1,
    margin: 20,
    backgroundColor: colors.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "150%",
    shadowColor: colors.CONTRAST,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    color: colors.CONTRAST,
    fontSize: 40,
    textAlign: "center",
  },
});

export default AppButton;
