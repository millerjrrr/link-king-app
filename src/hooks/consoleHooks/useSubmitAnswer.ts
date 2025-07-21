import {
  selectConsoleLocals,
  selectConsoleState,
  setDisabled,
  stopPlaying,
} from "@src/store/console";
import { acceptAnswer } from "../../utils/acceptAnswer";
import { useDispatch, useSelector } from "react-redux";
import useHandleCorrectAnswer from "./useHandleCorrectAnswer";
import useHandleWrongAnswer from "./useHandleWrongAnswer";
import { updateLevelPop } from "../../store/notification";

const useSubmitAnswer = () => {
  const dispatch = useDispatch();
  const handleCorrectAnswer = useHandleCorrectAnswer();
  const handleWrongAnswer = useHandleWrongAnswer();
  const { isDisabled } = useSelector(selectConsoleLocals);

  const {
    locals: { formValue },
    gamePlay: { level, solutions },
  } = useSelector(selectConsoleState);

  const submitAnswer = (value?: string) => {
    if (!isDisabled) {
      dispatch(setDisabled(true));
      dispatch(stopPlaying());
      console.log(value || formValue);
      const answerAccepted = acceptAnswer(
        value || formValue,
        solutions,
      );
      if (answerAccepted) {
        handleCorrectAnswer();
      } else handleWrongAnswer();
      // if (level > 0)
      dispatch(
        updateLevelPop({
          level,
          popType: answerAccepted,
        }),
      );

      setTimeout(() => dispatch(setDisabled(false)), 800);
      return false;
    }
  };
  return submitAnswer;
};

export default useSubmitAnswer;
