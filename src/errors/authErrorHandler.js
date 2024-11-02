import catchAsyncError from "@src/api/catchError";
import { updateNotification } from "@src/store/notification";

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
