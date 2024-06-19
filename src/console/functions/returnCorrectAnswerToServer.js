import clientWithAuth from "../../api/clientWithAuth";
import {
  restartTheTimer,
  updateCSState,
  incrementStatsTime,
  updateBusyState,
} from "../../store/console";
import { updateConsoleState } from "./updateConsoleState";
import { errorHandler } from "../../errors/errorHandler";
import { speak } from "./speak";
import returnReversoData from "./reverso";

export const returnCorrectAnswerToServer = async ({
  dispatch,
  startedThisWord,
  showSolution,
}) => {
  const payload = {
    timeOnThisWord: 0, // the clock is reset to zero, and starts counting the next timeOnThisWord to be sent to the server
    startedThisWord: Date.now(),
    timerIsOn: true, // the clock should still be running to count seconds playing the game
    busy: true,
    showSolution: false,
    formValue: "",
  };
  dispatch(updateCSState(payload));
  try {
    const time = !showSolution
      ? Math.min(Date.now() - startedThisWord, 30 * 1000)
      : Math.min(Date.now() - startedThisWord, 10 * 1000);
    dispatch(incrementStatsTime(time));
    let { data } = await clientWithAuth.post(
      "/api/console/submit-attempt",
      {
        correct: true,
        time,
      },
    );
    const {
      gamePlay: { target, speechLang: language },
      options: { sound },
    } = data;
    // data = await returnReversoData({ data });
    updateConsoleState(data, dispatch);
    speak({ target, language, sound });
    dispatch(restartTheTimer());
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    errorHandler(error, dispatch);
  }
};
