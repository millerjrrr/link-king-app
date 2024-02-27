import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { AntDesign } from "@expo/vector-icons";
import Loader from "../ui/Loader";

const GetLevelsBreakdownButton = ({
  onPress,
  text,
  isText = false,
}) => {
  const { golden } = useSelector(getConsoleState);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          { shadowColor: colors.CONTRAST[golden] },
        ]}
      >
        {!text ? (
          !isText ? (
            <AntDesign
              name="barschart"
              size={18}
              color={colors.CONTRAST[golden]}
            />
          ) : (
            <Loader size={12} />
          )
        ) : (
          <Text
            style={[
              styles.text,
              { color: colors.CONTRAST[golden] },
            ]}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 4,
  },
  button: {
    width: 30,
    aspectRatio: 1,
    margin: 3,
    backgroundColor: colors.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "150%",
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default GetLevelsBreakdownButton;
