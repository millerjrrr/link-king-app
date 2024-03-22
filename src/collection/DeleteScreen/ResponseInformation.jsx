import { Text } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appTextContent from "../../utils/appTextContent";

const ResponseInformation = ({ status }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { resA, resB } =
    appTextContent.english.collection.deleteScreen;

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
