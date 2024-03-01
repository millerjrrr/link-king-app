import catchAsyncError from "../api/catchError";
import { updateConnectedState } from "../store/auth";
import { updateNotification } from "../store/notification";

export const errorHandler = (error, dispatch) => {
  const errorMessage = catchAsyncError(error);
  if (errorMessage.slice(0, 7) === "timeout")
    dispatch(updateConnectedState(false));
  dispatch(
    updateNotification({
      message: errorMessage,
      type: "error",
    }),
  );
};
