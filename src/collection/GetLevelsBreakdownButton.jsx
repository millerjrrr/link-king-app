import {
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { AntDesign } from "@expo/vector-icons";

const GetLevelsBreakdownButton = ({
  onPress,
  iconName,
}) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  return (
    <TouchableOpacity
      {...{
        style: [styles.button, { shadowColor: color }],
        onPress,
      }}
    >
      <AntDesign {...{ name: iconName, size: 18, color }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    aspectRatio: 1,
    margin: 7,
    marginBottom: 0,
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
