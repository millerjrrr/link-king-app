import { View, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import { getSettingsState } from "../store/settings";
import styled from "styled-components";
import SolutionsList from "./SolutionsList";
import AppText from "../ui/AppText";

const TailEntryText = styled(AppText)`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}px;
  opacity: ${(props) => props.opacity};
  text-align: center;
`;

const TailEntry = ({ index }) => {
  const { tail, showSolution } =
    useSelector(getConsoleState);
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  //font-size management
  let size = (4 - index) * 7 + 12;
  const length = tail[index] ? tail[index].length : 0;
  if (length > 12) size = (size * 12) / length;

  const opacity = 1 / (index + 1) / 2;

  return (
    <TailEntryText
      {...{
        color,
        size,
        opacity,
      }}
    >
      {tail[index]}
    </TailEntryText>
  );
};

const Tail = () => {
  const { showSolution } = useSelector(getConsoleState);
  return (
    <View style={styles.container}>
      {!showSolution ? (
        <>
          <TailEntry index={0} />
          <TailEntry index={1} />
          <TailEntry index={2} />
          <TailEntry index={3} />
        </>
      ) : (
        <SolutionsList />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    zIndex: 5,
    overflow: "hidden",
  },
});

export default Tail;
