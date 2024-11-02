import catchAsyncError from "@src/api/catchError";
import { updateConnectedState } from "@src/store/auth";
import { updateNotification } from "@src/store/notification";
import logOut from "@src/utils/logOut";

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
