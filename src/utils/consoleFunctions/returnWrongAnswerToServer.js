import clientWithAuth from "@src/api/clientWithAuth";
import {
  updateBusyState,
  resetTimer,
  resetTimeOnThisWord,
  incrementStatsTime,
  resetConsole,
} from "@src/store/console";
import { updateConsoleState } from "./updateConsoleState";
import { Vibration } from "react-native";
import { errorHandler } from "@src/errors/errorHandler";
import { speak } from "@src/utils/speak";

export const returnWrongAnswerToServer = async ({
  dispatch,
  startedThisWord,
  showSolution,
}) => {
  Vibration.vibrate(500);
  dispatch(updateBusyState(true));
  try {
    const time = !showSolution
      ? Math.min(Date.now() - startedThisWord, 30 * 1000)
      : Math.min(Date.now() - startedThisWord, 10 * 1000);
    dispatch(resetTimeOnThisWord());
    dispatch(incrementStatsTime(time));
    let { data } = await clientWithAuth.post(
      "/api/v1/console/submit-attempt",
      {
        correct: false,
        time,
      },
    );
    const {
      gamePlay: { target, speechLang: language },
      options: { sound },
    } = data;
    updateConsoleState(data, dispatch);
    dispatch(resetTimer());
    speak({ target, language, sound });
    dispatch(resetConsole());
  } catch (error) {
    dispatch(updateBusyState(false));
    dispatch(resetConsole());
    errorHandler(error, dispatch);
  }
};