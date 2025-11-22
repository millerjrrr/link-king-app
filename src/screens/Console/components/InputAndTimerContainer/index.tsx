import { StyleSheet, View } from "react-native";
import Timer from "./Timer";
import TargetDetailsButton from "./TargetDetailsButton";
import LoaderForTextInputForConsole from "./LoaderForTextInputForConsole";
import TextInputForConsole from "./TextInputForConsole";
import useSubmitAnswer from "@src/hooks/consoleHooks/useSubmitAnswer";
import XButton from "./XButton";
import useColors from "@src/hooks/utilityHooks/useColors";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const InputAndTimerContainer: React.FC<{
  setIsKeyboardVisible: (value: boolean) => void;
}> = ({ setIsKeyboardVisible }) => {
  const { CONTRAST } = useColors();
  const color = CONTRAST;

  const submitAnswer = useSubmitAnswer();

  return (
    <View style={styles.formView}>
      <Timer
        onComplete={() => submitAnswer()}
        color={color}
      />
      <LoaderForTextInputForConsole color={color} />
      <TargetDetailsButton />
      <XButton color={color} />
      <TextInputForConsole
        onSubmitEditing={() => submitAnswer()} //important to declare the function like this
        setIsKeyboardVisible={setIsKeyboardVisible}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginBottom: base * 10,
  },
});

export default InputAndTimerContainer;
