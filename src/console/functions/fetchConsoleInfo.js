import {
  updateBusyState,
  updateShowSolution,
} from "../../store/console";
import { updateConsoleState } from "./updateConsoleState";
import clientWithAuth from "../../api/clientWithAuth";
import { errorHandler } from "../../errors/errorHandler";

export const fetchConsoleInfo = async ({ dispatch }) => {
  try {
    dispatch(updateBusyState(true));
    dispatch(updateShowSolution(false));
    const { data } = await clientWithAuth.get(
      "/api/console/send-game-state",
    );
    updateConsoleState(data, dispatch);
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    errorHandler(error, dispatch);
  }
};
