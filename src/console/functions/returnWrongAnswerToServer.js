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
import { Vibration } from "react-native";
import catchAsyncError from "../../api/catchError";
import { updateNotification } from "../../store/notification";

export const returnWrongAnswerToServer = async (
  dispatch,
  timeOnThisWord,
  timerIsOn,
) => {
  Vibration.vibrate(3000);
  dispatch(updateIsPlaying(false));
  try {
    dispatch(updateBusyState(true));
    const time = timerIsOn
      ? Math.min(timeOnThisWord, 30 * 1000)
      : 0;
    const { data } = await clientWithAuth.post(
      "/api/v1/gameData/submitAttempt",
      {
        correct: false,
        time,
      },
    );
    updateConsoleState(data, dispatch);
    Speech.speak(data.gamePlay.target, {
      language: data.gamePlay.speechLang,
    });
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
  dispatch(updateFormValue(""));
  dispatch(updateShowSolution(true));
  dispatch(restartTheTimer()); // used to highlight the input and restart the timer
  dispatch(updateIsPlaying(false));
  dispatch(updateTimeOnThisWord(0));
  dispatch(updateTimerIsOn(false));
};
