import clientWithAuth from "@src/api/clientWithAuth";
import {
  restartTheTimer,
  incrementStatsTime,
  updateBusyState,
  updateLocals,
  updateConsoleState,
} from "@src/store/console";
import { errorHandler } from "@src/errors/errorHandler";
import { speak } from "@src/utils/speak";

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
  dispatch(updateLocals(payload));
  try {
    const time = !showSolution
      ? Math.min(Date.now() - startedThisWord, 30 * 1000)
      : Math.min(Date.now() - startedThisWord, 10 * 1000);
    dispatch(incrementStatsTime(time));
    let { data } = await clientWithAuth.post(
      "/api/v1/console/submit-attempt",
      {
        correct: true,
        time,
      },
    );
    const {
      gamePlay: { target, speechLang: language },
      options: { sound },
    } = data;

    dispatch(updateConsoleState({ ...data }));
    dispatch(updateBusyState(false));
    speak({ target, language, sound });
    dispatch(restartTheTimer());
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    errorHandler(error, dispatch);
  }
};
