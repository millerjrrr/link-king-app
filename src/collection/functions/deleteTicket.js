import catchAsyncError from "../../api/catchError";
import clientWithAuth from "../../api/clientWithAuth";
import { updateNotification } from "../../store/notification";

export const deleteTicket = async (
  ticketId,
  setBusy,
  setStatus,
  dispatch,
) => {
  try {
    setBusy(true);
    const { data } = await clientWithAuth.post(
      "/api/v1/tickets/deleteOne",
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
    setBusy(false);
    setStatus(false);
  } finally {
    setBusy(false);
  }
};
