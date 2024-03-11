import { Text } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import { getColorsState } from "../../store/colors";

const Target = () => {
  const { attempt } = useSelector(getConsoleState);
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <Text
      style={{ color, fontSize: 40, margin: 5, zIndex: 1 }}
    >
      {attempt.target}
    </Text>
  );
};

export default Target;
