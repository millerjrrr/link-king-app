import {
  updateBusyState,
  updateConnectedState,
  updateShowSolution,
} from "../../store/console";
import { updateConsoleState } from "./updateConsoleState";
import clientWithAuth from "../../api/clientWithAuth";
import { updateNotification } from "../../store/notification";
import catchAsyncError from "../../api/catchError";

export const fetchConsoleInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  dispatch(updateConnectedState(true));
  dispatch(updateShowSolution(false));
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/gameData/sendGameState",
    );
    updateConsoleState(data, dispatch);
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    dispatch(
      updateNotification({
        message: errorMessage,
        type: "error",
      }),
    );
    dispatch(updateConnectedState(false));
  } finally {
    dispatch(updateBusyState(false));
  }
};
