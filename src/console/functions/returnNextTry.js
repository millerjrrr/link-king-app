import { Vibration } from "react-native";
import {
  updateTries,
  restartTheTimer,
  updateIsPlaying,
  updateTimerIsOn,
} from "../../store/console";

export const returnNextTry = async (dispatch, tries) => {
  Vibration.vibrate(200);
  dispatch(updateTries(tries - 1));
  dispatch(restartTheTimer()); // used to highlight the input and restart the timer
  dispatch(updateIsPlaying(true));
  dispatch(updateTimerIsOn(true));
};
