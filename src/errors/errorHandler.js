import returnErrorMessage from "@src/utils/returnErrorMessage";
import { updateConnectedState } from "@src/store/auth";
import { updateNotification } from "@src/store/notification";
import logOut from "@src/utils/logOutDEP";

export const errorHandler = (error, dispatch) => {
  const errorMessage = returnErrorMessage(error);
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
