import catchAsyncError from "../api/catchError";
import { updateConnectedState } from "../store/auth";
import { updateNotification } from "../store/notification";

export const errorHandler = (error, dispatch) => {
  const errorMessage = catchAsyncError(error);
  if (errorMessage.startsWith("timeout"))
    dispatch(updateConnectedState(false));
  dispatch(
    updateNotification({
      message: errorMessage,
      type: "error",
    }),
  );
};
