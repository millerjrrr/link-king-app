import { Text, Pressable } from "react-native";
import colors from "../utils/colors";

const AppLink = ({ title, onPress }) => {
  const color = colors.dark.INACTIVE_CONTRAST;

  return (
    <Pressable
      {...{ onPress, style: { margin: 5, marginTop: 10 } }}
    >
      <Text style={{ color, fontSize: 15 }}>{title}</Text>
    </Pressable>
  );
};

export default AppLink;
