import clientWithAuth from "../../api/clientWithAuth";
import {
  restartTheTimer,
  updateCSState,
  incrementStatsTime,
} from "../../store/console";
import * as Speech from "expo-speech";
import { updateConsoleState } from "./updateConsoleState";
import { errorHandler } from "../../errors/errorHandler";

export const returnCorrectAnswerToServer = async (
  dispatch,
  startedThisWord,
  showSolution,
) => {
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
      : 0;
    dispatch(incrementStatsTime(time));
    console.log(time);
    const { data } = await clientWithAuth.post(
      "/api/v1/gameData/submitAttempt",
      {
        correct: true,
        time,
      },
    );
    updateConsoleState(data, dispatch);
    Speech.speak(data.gamePlay.target, {
      language: data.gamePlay.speechLang,
    });
    dispatch(restartTheTimer());
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    errorHandler(error, dispatch);
  }
};
