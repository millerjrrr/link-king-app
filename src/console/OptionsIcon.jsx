import {
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

const OptionsIcon = ({
  onPress,
  color,
  size,
  entypo,
  option,
  textTrue,
  textFalse,
}) => {
  const height = (size * 80) / 50;

  return (
    <TouchableOpacity
      {...{
        onPress,
        style: [
          styles.option,
          { shadowColor: color, height },
        ],
      }}
    >
      {entypo ? (
        <Entypo
          {...{
            name: option ? textTrue : textFalse,
            size,
            color,
          }}
        />
      ) : (
        <MaterialIcons
          {...{
            name: option ? textTrue : textFalse,
            size,
            color,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    borderRadius: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.SECONDARY,
    margin: 5,
    marginBottom: 0,
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
});

export default OptionsIcon;
