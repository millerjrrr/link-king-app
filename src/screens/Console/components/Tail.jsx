import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import styled from "styled-components/native";
import SolutionsList from "./SolutionsList";
import AppText from "../../../components/AppText";

const TailEntryText = styled(AppText)`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}px;
  opacity: ${(props) => props.opacity};
  text-align: center;
`;

const TailEntry = ({ index }) => {
  const {
    display: { tail },
  } = useSelector(selectConsoleState);
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  //font-size management
  let size = (4 - index) * 7 + 12;
  const length = tail[index] ? tail[index].length : 0;
  if (length > 12) size = (size * 12) / length;

  const opacity = 1 / (index + 1) / 2;

  return tail[index] ? (
    <TailEntryText
      {...{
        color,
        size,
        opacity,
      }}
    >
      {tail[index]}
    </TailEntryText>
  ) : null;
};

const Tail = ({ setIsKeyboardVisible }) => {
  const {
    locals: { showSolution },
    gamePlay: { solutions },
  } = useSelector(selectConsoleState);

  const onPress = () => {
    Keyboard.dismiss();
    setIsKeyboardVisible(false);
  };

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
        <SolutionsList {...{ ticket: { solutions } }} />
      )}
      <TouchableWithoutFeedback {...{ onPress }}>
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    zIndex: 5,
    overflow: "hidden",
  },
});

export default Tail;
