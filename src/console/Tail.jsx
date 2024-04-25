import { Text, View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { getSettingsState } from "../store/settings";
import styled from "styled-components";
import SolutionItem from "./TargetDetailsScreen/SolutionItem";
import SolutionsList from "./TargetDetailsScreen/SolutionsList";

const TailEntryText = styled(Text)`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}px;
  opacity: ${(props) => props.opacity};
  text-align: center;
`;

const TailEntry = ({ index }) => {
  const {
    tail,
    showSolution,
    attempt: { solutions },
  } = useSelector(getConsoleState);
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  //font-size management
  let size = (4 - index) * 7 + 12;
  const length = tail[index] ? tail[index].length : 0;
  if (length > 12) size = (size * 12) / length;

  const opacity = 1 / (index + 1) / 2;

  return !showSolution && tail[index] ? (
    <TailEntryText
      {...{
        color,
        size,
        opacity,
      }}
    >
      {tail[index]}
    </TailEntryText>
  ) : index === 0 ? (
    <SolutionsList {...{ showTitle: false }} />
  ) : null;
};

const Tail = () => {
  return (
    <View style={styles.container}>
      <TailEntry index={0} />
      <TailEntry index={1} />
      <TailEntry index={2} />
      <TailEntry index={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignItems: "center",
    zIndex: 5,
  },
});

export default Tail;
