import clientWithAuth from "../../api/clientWithAuth";
import {
  updateBusyState,
  resetTimer,
  resetTimeOnThisWord,
  incrementStatsTime,
  resetConsole,
} from "../../store/console";
import * as Speech from "expo-speech";
import { updateConsoleState } from "./updateConsoleState";
import { Vibration } from "react-native";
import { errorHandler } from "../../errors/errorHandler";

export const returnWrongAnswerToServer = async ({
  dispatch,
  startedThisWord,
  showSolution,
}) => {
  Vibration.vibrate(3000);
  dispatch(updateBusyState(true));
  try {
    const time = !showSolution
      ? Math.min(Date.now() - startedThisWord, 30 * 1000)
      : Math.min(Date.now() - startedThisWord, 10 * 1000);
    dispatch(resetTimeOnThisWord());
    dispatch(incrementStatsTime(time));
    console.log(time);
    const { data } = await clientWithAuth.post(
      "/api/console/submit-attempt",
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
    dispatch(resetConsole());
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    dispatch(resetConsole());
    errorHandler(error, dispatch);
  }
};
