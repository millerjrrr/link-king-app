import catchAsyncError from "../../api/catchError";
import clientWithAuth from "../../api/clientWithAuth";
import { updateStatsState } from "./updateStatsState";
import { updateNotification } from "../../store/notification";
import {
  updateBusyState,
  updateConnectedState,
} from "../../store/stats";

export const fetchStatsInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  dispatch(updateConnectedState(true));
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/tickets/statistics",
    );
    updateStatsState(data, dispatch);
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
