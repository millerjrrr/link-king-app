import { Text, StyleSheet } from "react-native";
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
        fontSize: 25,
        margin: 15,
        textAlign: "center",
      }}
    >
      This word has been flagged for review and removed from
      your collection. Thank you for your help!
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
      ...something went wrong 😣 please check your internet
      connection and try again...
    </Text>
  );
};

export default ResponseInformation;
