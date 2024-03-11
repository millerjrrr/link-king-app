import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import {
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getColorsState } from "../../store/colors";

const KeyboardIcon = ({
  name,
  entypo,
  size = 48,
  onPress,
}) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];
  return (
    <TouchableOpacity
      {...{ onPress, style: { margin: 4 } }}
    >
      {entypo ? (
        <Entypo {...{ name, size, color }} />
      ) : (
        <MaterialCommunityIcons
          {...{ name, size, color }}
        />
      )}
    </TouchableOpacity>
  );
};

export default KeyboardIcon;
