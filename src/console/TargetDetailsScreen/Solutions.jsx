import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";

const Solutions = () => {
  const { attempt } = useSelector(getConsoleState);
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  let solutionString = "";
  attempt.solutions.forEach((solution, index) => {
    solutionString +=
      solution +
      (index < attempt.solutions.length - 1 ? "; " : "");
  });

  return (
    <>
      <Text
        style={{
          color,
          fontSize: 20,
          marginTop: 10,
        }}
      >
        Accepted Answers:
      </Text>
      <Text
        style={{
          textAlign: "center",
          color,
          fontSize: 25,
          margin: 2,
        }}
      >
        {solutionString}
      </Text>
    </>
  );
};

export default Solutions;
