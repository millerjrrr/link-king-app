import { Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";

const AppLink = ({ title, onPress }) => {
  const { colorScheme } = useSelector(getSettingsState);
  const color = colors[colorScheme].INACTIVE_CONTRAST;

  return (
    <TouchableOpacity
      {...{
        onPress,
        style: { padding: 5, paddingTop: 10 },
      }}
    >
      <Text style={{ color, fontSize: 15 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppLink;
