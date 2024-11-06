import { useDispatch, useSelector } from "react-redux";
import {
  backOut,
  selectConsoleLocals,
} from "@src/store/console";
import { useEffect } from "react";
import { Keyboard } from "react-native";
import useHandleWrongAnswer from "../useHandleWrongAnswer";

const useOnKeyboardClose = () => {
  const { startedThisWord, showSolution, isPlaying } =
    useSelector(selectConsoleLocals);

  const dispatch = useDispatch();
  const handleWrongAnswer = useHandleWrongAnswer();

  const onKeyboardClose = () => {
    if (!showSolution && isPlaying) {
      handleWrongAnswer();
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
