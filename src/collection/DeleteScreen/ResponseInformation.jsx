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

  const { resA, resB } =
    appTextSource[appLang].collection.deleteScreen;

  return status ? (
    <Text
      style={{
        color,
        fontSize: 30,
        textAlign: "center",
      }}
    >
      {resA}
    </Text>
  ) : (
    <Text
      style={{
        color,
        fontSize: 30,
        textAlign: "center",
      }}
    >
      {resB}
    </Text>
  );
};

export default ResponseInformation;
