import { Text } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";

const ResponseInformation = ({ status }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

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
