import catchAsyncError from "../../api/catchError";
import clientWithAuth from "../../api/clientWithAuth";
import { updateNotification } from "../../store/notification";

export const flagWordAndDeleteTicket = async (
  ticketId,
  setBusy,
  setStatus,
  setWordFlagged,
  dispatch,
) => {
  try {
    setBusy(true);
    const { data } = await clientWithAuth.post(
      "/api/v1/dictionary/flagWord",
      {
        ticketId,
      },
    );
    setStatus(data.status === "success");
    setWordFlagged(true);
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    dispatch(
      updateNotification({
        message: errorMessage,
        type: "error",
      }),
    );
    setBusy(false);
    setStatus(false);
  } finally {
    setBusy(false);
  }
};
