import {
  updateBusyState,
  updateShowSolution,
} from "@src/store/console";
import { updateConsoleState } from "./updateConsoleState";
import clientWithAuth from "@src/api/clientWithAuth";
import { errorHandler } from "@src/errors/errorHandler";

export const fetchConsoleInfo = async ({
  dispatch,
  repeatRepeats = false,
}) => {
  const url = repeatRepeats
    ? "/api/v1/console/repeat-repeats"
    : "/api/v1/console/send-game-state";
  try {
    dispatch(updateBusyState(true));
    dispatch(updateShowSolution(false));
    let { data } = await clientWithAuth.get(url);

    updateConsoleState(data, dispatch);
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    errorHandler(error, dispatch);
  }
};
