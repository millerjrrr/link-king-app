import catchAsyncError from "../api/catchError";
import clientWithAuth from "../api/clientWithAuth";
import { updateNotification } from "../store/notification";

export const flagAndDeleteTicket = async (
  ticketId,
  setBusy,
  setStatus,
  setPressed,
  flagWord,
  dispatch,
) => {
  setPressed(true);
  setBusy(true);
  try {
    const { data } = flagWord
      ? await clientWithAuth.post(
          "/api/v1/collection/flag-word",
          {
            ticketId,
          },
        )
      : await clientWithAuth.post(
          "/api/v1/collection/delete-ticket",
          {
            ticketId,
          },
        );
    setStatus(data.status === "success");
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    dispatch(
      updateNotification({
        message: errorMessage,
        type: "error",
      }),
    );
    setStatus(false);
  } finally {
    setBusy(false);
  }
};
