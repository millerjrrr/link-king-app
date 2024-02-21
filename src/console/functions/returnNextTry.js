import { Vibration } from "react-native";
import {
  updateTries,
  restartTheTimer,
} from "../../store/console";

export const returnNextTry = async (dispatch, tries) => {
  Vibration.vibrate(200);
  dispatch(updateTries(tries - 1));
  dispatch(restartTheTimer());
};
