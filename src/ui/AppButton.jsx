import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import colors from "../utils/colors";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const AppButton = ({ title, busy, onPress }) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.buttonContainer,
          { shadowColor: colors.CONTRAST[golden] },
        ]}
      >
        {!busy ? (
          <Text
            style={[
              styles.text,
              { color: colors.CONTRAST[golden] },
            ]}
          >
            {title}
          </Text>
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
  },
  buttonContainer: {
    width: "60%",
    aspectRatio: 1,
    margin: 20,
    backgroundColor: colors.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
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
    fontSize: 40,
    textAlign: "center",
  },
});

export default AppButton;
