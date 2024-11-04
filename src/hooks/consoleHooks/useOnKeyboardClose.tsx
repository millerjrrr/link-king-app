import { useDispatch, useSelector } from "react-redux";
import {
  backOut,
  getConsoleState,
} from "@src/store/console";
import { useEffect } from "react";
import { Keyboard } from "react-native";
import { returnWrongAnswerToServer } from "@src/utils/returnWrongAnswerToServer";

const useOnKeyboardClose = () => {
  const { startedThisWord, showSolution, isPlaying } =
    useSelector(getConsoleState);

  const dispatch = useDispatch();

  const onKeyboardClose = () => {
    if (!showSolution && isPlaying) {
      returnWrongAnswerToServer({
        dispatch,
        startedThisWord,
        showSolution,
      });
    } else {
      dispatch(backOut());
    }
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardClose,
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [dispatch, startedThisWord, showSolution]);
};

export default useOnKeyboardClose;
