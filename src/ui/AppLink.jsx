import { Text, Pressable } from "react-native";
import colors from "../utils/colors";

const AppLink = ({ title, onPress }) => {
  const color = colors.INACTIVE_CONTRAST;

  return (
    <Pressable {...{ onPress, style: { margin: 5 } }}>
      <Text style={{ color, fontSize: 18 }}>{title}</Text>
    </Pressable>
  );
};

export default AppLink;
