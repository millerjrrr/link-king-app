import { Text } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";

const AcceptedAnswers = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { accepted } =
    appTextSource[appLang].console.targetDetails;

  return (
    <Text
      style={{
        color,
        fontSize: 20,
        marginTop: 10,
        textAlign: "center",
      }}
    >
      {accepted}
    </Text>
  );
};

export default AcceptedAnswers;
