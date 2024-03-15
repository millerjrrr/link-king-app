import {
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import { getSettingsState } from "../store/settings";
import { useSelector } from "react-redux";

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

  const { colorScheme } = useSelector(getSettingsState);
  const backgroundColor = colors[colorScheme].SECONDARY;

  return (
    <TouchableOpacity
      {...{
        onPress,
        style: [
          styles.option,
          { shadowColor: color, height, backgroundColor },
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
    borderRadius: 1000,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
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
