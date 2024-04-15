import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import {
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getSettingsState } from "../../store/settings";

const KeyboardIcon = ({
  name,
  entypo,
  size = 48,
  onPress,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  return (
    <TouchableOpacity
      {...{
        onPress,
        style: {
          padding: 4,
          paddingBottom: 0,
          zIndex: 1000,
        },
      }}
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
