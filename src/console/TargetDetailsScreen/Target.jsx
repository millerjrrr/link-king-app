import { Text } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";

const Target = () => {
  const { attempt, golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  return (
    <Text
      style={{ color, fontSize: 40, margin: 5, zIndex: 1 }}
    >
      {attempt.target}
    </Text>
  );
};

export default Target;
