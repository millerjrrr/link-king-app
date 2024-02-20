import clientWithAuth from "../../api/clientWithAuth";
import {
  updateBusyState,
  updateConnectedState,
  updateFormValue,
  updateShowSolution,
  updateTimeOnThisWord,
  updateIsPlaying,
  restartTheTimer,
  updateTimerIsOn,
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
  dispatch(updateIsPlaying(false));
  dispatch(updateShowSolution(false));
  dispatch(updateFormValue(""));
  try {
    dispatch(updateBusyState(true));
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
    dispatch(updateIsPlaying(true));
    dispatch(updateTimeOnThisWord(0));
    dispatch(updateTimerIsOn(true));
    dispatch(restartTheTimer()); // used to highlight the input and restart the timer
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
