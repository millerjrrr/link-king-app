import { Text } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";

const ResponseInformation = ({ status }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return status ? (
    <Text
      style={{
        color,
        fontSize: 30,
        textAlign: "center",
      }}
    >
      This word has been removed from your collection. You
      will no longer see it as part of your repetitions but
      you may see it again as a new word challenge at some
      point in the future
    </Text>
  ) : (
    <Text
      style={{
        color,
        fontSize: 30,
        textAlign: "center",
      }}
    >
      ...something went wrong 😣 please check your internet
      connection and try again...
    </Text>
  );
};

export default ResponseInformation;
