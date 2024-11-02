import StartButton from "./StartButton";

const KeyboardAndStartButton = ({
  inputFieldRef,
  isKeyboardVisible,
}) => {
  return isKeyboardVisible ? null : (
    <StartButton {...{ inputFieldRef }} />
  );
};

export default KeyboardAndStartButton;
