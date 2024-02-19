import catchAsyncError from "../../api/catchError";
import clientWithAuth from "../../api/clientWithAuth";
import { updateNotification } from "../../store/notification";

export const fetchTickets = async (
  setTickets,
  setFilteredTickets,
  setBusy,
  setConnected,
  setSearchKeyword,
  dispatch,
) => {
  setBusy(true);
  setConnected(true);
  setSearchKeyword("");
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/tickets/collection",
    );
    setTickets(data.data.tickets);
    setFilteredTickets(data.data.tickets);
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    dispatch(
      updateNotification({
        message: errorMessage,
        type: "error",
      }),
    );
    setConnected(false);
  } finally {
    setBusy(false);
  }
};
