import {
  updateBusyState,
  updateShowSolution,
} from "../../store/console";
import { updateConsoleState } from "./updateConsoleState";
import clientWithAuth from "../../api/clientWithAuth";
import { errorHandler } from "../../errors/errorHandler";
import returnReversoData from "./reverso";

export const fetchConsoleInfo = async ({ dispatch }) => {
  try {
    dispatch(updateBusyState(true));
    dispatch(updateShowSolution(false));
    let { data } = await clientWithAuth.get(
      "/api/console/send-game-state",
    );
    const { dictionary } = data;

    if (dictionary === "Personal")
      data = await returnReversoData({ data });
    updateConsoleState(data, dispatch);
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    errorHandler(error, dispatch);
  }
};
