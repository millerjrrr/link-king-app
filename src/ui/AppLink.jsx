import { Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

const AppLink = ({ title, onPress }) => {
  const color = colors.dark.INACTIVE_CONTRAST;

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
