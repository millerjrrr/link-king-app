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

const useSubmitAnswer = () => {
  const dispatch = useDispatch();
  const handleCorrectAnswer = useHandleCorrectAnswer();
  const handleWrongAnswer = useHandleWrongAnswer();
  const { isDisabled } = useSelector(selectConsoleLocals);

  const {
    locals: { formValue },
    gamePlay: { solutions },
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
      setTimeout(() => dispatch(setDisabled(false)), 800);
      return false;
    }
  };
  return submitAnswer;
};

export default useSubmitAnswer;
