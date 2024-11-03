import returnErrorMessage from "@src/utils/returnErrorMessage";
import { updateNotification } from "@src/store/notification";

export const authErrorHandler = (error, dispatch) => {
  let errorMessage = returnErrorMessage(error);
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
