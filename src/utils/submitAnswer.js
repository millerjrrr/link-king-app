import { stopPlaying } from "@src/store/console";
import { acceptAnswer } from "./acceptAnswer";
import { returnCorrectAnswerToServer } from "./returnCorrectAnswerToServer";
import { returnNextTry } from "./returnNextTry";
import { returnWrongAnswerToServer } from "./returnWrongAnswerToServer";

export const submitAnswer = ({
  dispatch,
  formValue,
  solutions,
  tries,
  startedThisWord,
  showSolution,
  timeUp,
}) => {
  dispatch(stopPlaying());
  const answerAccepted = acceptAnswer(formValue, solutions);
  if (formValue === "" && !timeUp)
    returnWrongAnswerToServer({
      dispatch,
      startedThisWord,
      showSolution,
    });
  else if (answerAccepted)
    returnCorrectAnswerToServer({
      dispatch,
      startedThisWord,
      showSolution,
    });
  else if (tries > 1) returnNextTry({ dispatch });
  else
    returnWrongAnswerToServer({
      dispatch,
      startedThisWord,
      showSolution,
    });

  return false;
};
