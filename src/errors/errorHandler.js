import catchAsyncError from "../api/catchError";
import { updateConnectedState } from "../store/auth";
import { updateNotification } from "../store/notification";
import logOut from "../utils/logOut";

export const errorHandler = (error, dispatch) => {
  const errorMessage = catchAsyncError(error);
  if (errorMessage.startsWith("timeout"))
    dispatch(updateConnectedState(false));
  if (
    errorMessage.startsWith("jwt expired") ||
    errorMessage.startsWith("Your token has expired!")
  )
    logOut(dispatch);
  dispatch(
    updateNotification({
      message: errorMessage,
      type: "error",
    }),
  );
};
