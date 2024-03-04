import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import {
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const KeyboardIcon = ({
  name,
  entypo,
  size = 48,
  onPress,
}) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
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
