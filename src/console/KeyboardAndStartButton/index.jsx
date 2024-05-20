import StartButton from "./StartButton";
import KeyboardIconContainer from "./KeyboardIconContainer";

const KeyboardAndStartButton = ({
  inputFieldRef,
  isKeyboardVisible,
}) => {
  return isKeyboardVisible ? null : (
    // <KeyboardIconContainer />
    <StartButton {...{ inputFieldRef }} />
  );
};

export default KeyboardAndStartButton;
