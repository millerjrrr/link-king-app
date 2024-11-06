import {
  selectConsoleState,
  stopPlaying,
  updateTries,
} from "@src/store/console";
import { acceptAnswer } from "../../utils/acceptAnswer";
import { useDispatch, useSelector } from "react-redux";
import useHandleCorrectAnswer from "./useHandleCorrectAnswer";
import useHandleWrongAnswer from "./useHandleWrongAnswer";
import { Vibration } from "react-native";

const useSubmitAnswer = () => {
  const dispatch = useDispatch();
  const handleCorrectAnswer = useHandleCorrectAnswer();
  const handleWrongAnswer = useHandleWrongAnswer();

  const {
    locals: { formValue },
    gamePlay: { solutions, tries },
  } = useSelector(selectConsoleState);

  const submitAnswer = (timeOut: boolean) => {
    dispatch(stopPlaying());
    const answerAccepted = acceptAnswer(
      formValue,
      solutions,
    );
    if (formValue === "" && !timeOut) handleWrongAnswer();
    else if (answerAccepted) handleCorrectAnswer();
    else if (tries > 1) {
      Vibration.vibrate(200);
      dispatch(updateTries());
    } else handleWrongAnswer();

    return false;
  };
  return submitAnswer;
};

export default useSubmitAnswer;
