import catchAsyncError from "../api/catchError";
import { updateNotification } from "../store/notification";

export const authErrorHandler = (error, dispatch) => {
  let errorMessage = catchAsyncError(error);
  errorMessage = errorMessage.startsWith("timeout")
    ? "no internet connection"
    : errorMessage;
  dispatch(
    updateNotification({
      message: errorMessage,
      type: "error",
    }),
  );
};
