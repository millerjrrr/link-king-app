import { Text } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const ResponseInformation = ({ status }) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { responseA, responseB } =
    appTextSource[appLang].console.targetDetails;

  return status ? (
    <Text
      style={{
        color,
        fontSize: 25,
        margin: 10,
        textAlign: "center",
      }}
    >
      {responseA}
    </Text>
  ) : (
    <Text
      style={{
        color,
        fontSize: 25,
        margin: 15,
        textAlign: "center",
      }}
    >
      {responseB}
    </Text>
  );
};

export default ResponseInformation;
