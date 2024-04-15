import { Text } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";

const Target = () => {
  const { attempt } = useSelector(getConsoleState);
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  //font-size management
  let fontSize = 40;
  const length = attempt.target.length;
  if (length > 12) fontSize = (fontSize * 12) / length;

  return (
    <Text
      style={{
        color,
        fontSize,
        margin: 5,
        zIndex: 1,
        textAlign: "center",
      }}
    >
      {attempt.target}
    </Text>
  );
};

export default Target;
