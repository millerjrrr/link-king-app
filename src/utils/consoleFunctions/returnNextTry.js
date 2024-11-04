import { Vibration } from "react-native";
import { updateTries } from "@src/store/console";

export const returnNextTry = async ({ dispatch }) => {
  Vibration.vibrate(200);
  dispatch(updateTries());
};
