import clientWithAuth from "../../api/clientWithAuth";
import {
  updateBusyState,
  updateConnectedState,
  updateTimerIsOn,
  resetTimer,
  resetTimeOnThisWord,
  incrementStatsTime,
  resetConsole,
} from "../../store/console";
import * as Speech from "expo-speech";
import { updateConsoleState } from "./updateConsoleState";
import { Vibration } from "react-native";
import catchAsyncError from "../../api/catchError";
import { updateNotification } from "../../store/notification";

export const returnWrongAnswerToServer = async (
  dispatch,
  startedThisWord,
  showSolution,
) => {
  Vibration.vibrate(3000);
  dispatch(updateTimerIsOn(false));
  dispatch(updateBusyState(true));
  try {
    const time = !showSolution
      ? Math.min(
          new Date().getTime() - startedThisWord,
          30 * 1000,
        )
      : 0;
    dispatch(resetTimeOnThisWord());
    dispatch(incrementStatsTime(time));
    console.log(time);
    const { data } = await clientWithAuth.post(
      "/api/v1/gameData/submitAttempt",
      {
        correct: false,
        time,
      },
    );
    updateConsoleState(data, dispatch);
    dispatch(resetTimer());
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
  dispatch(resetConsole());
};
