import clientWithAuth from "../../api/clientWithAuth";
import {
  updateConnectedState,
  restartTheTimer,
  incrementStatsTime,
  updateCSState,
} from "../../store/console";
import * as Speech from "expo-speech";
import { updateConsoleState } from "./updateConsoleState";
import { updateNotification } from "../../store/notification";
import catchAsyncError from "../../api/catchError";

export const returnCorrectAnswerToServer = async (
  dispatch,
  timeOnThisWord,
  timerIsOn,
) => {
  const payload = {
    timeOnThisWord: 0, // the clock is reset to zero, and starts counting the next timeOnThisWord to be sent to the server
    updateIsPlaying: false, // turn the countdown timer off until result is returned from server
    timerIsOn: true, // the clock should still be running to count seconds playing the game
    busy: true,
    showSolution: false,
    formValue: "",
  };
  dispatch(updateCSState(payload));
  dispatch(incrementStatsTime(timeOnThisWord));
  try {
    const time = timerIsOn
      ? Math.min(timeOnThisWord, 30 * 1000)
      : 0;
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
    const errorMessage = catchAsyncError(error);
    dispatch(
      updateNotification({
        message: errorMessage,
        type: "error",
      }),
    );
    dispatch(updateConnectedState(false));
  }
};
