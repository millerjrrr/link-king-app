import clientWithAuth from "../../api/clientWithAuth";
import {
  updateBusyState,
  resetTimer,
  resetTimeOnThisWord,
  incrementStatsTime,
  resetConsole,
} from "../../store/console";
import { updateConsoleState } from "./updateConsoleState";
import { Vibration } from "react-native";
import { errorHandler } from "../../errors/errorHandler";
import { speak } from "../../utils/speak";
import returnReversoData from "./reverso";

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
      "/api/console/submit-attempt",
      {
        correct: false,
        time,
      },
    );
    const {
      gamePlay: { target, speechLang: language },
      options: { sound },
      // dictionary,
    } = data;
    // if (dictionary === "Personal")
    //   data = await returnReversoData({ data });
    updateConsoleState(data, dispatch);
    dispatch(resetTimer());
    speak({ target, language, sound });
    dispatch(resetConsole());
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    dispatch(resetConsole());
    errorHandler(error, dispatch);
  }
};
