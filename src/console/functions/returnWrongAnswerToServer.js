import clientWithAuth from "../../api/clientWithAuth";
import {
  updateBusyState,
  updateConnectedState,
  updateIsPlaying,
  updateCSState,
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
) => {
  Vibration.vibrate(3000);
  dispatch(updateTimerIsOn(false));
  dispatch(updateBusyState(true));
  try {
    const time = Math.min(timeOnThisWord, 30 * 1000);
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
  const payload = {
    formValue: "",
    showSolution: true,
    isPlaying: false,
    timeOnThisWord: 0,
  };
  dispatch(updateCSState(payload));
};
