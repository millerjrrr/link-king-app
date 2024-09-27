import catchAsyncError from "../../../api/catchError";
import clientWithAuth from "../../../api/clientWithAuth";
import { updateNotification } from "../../../store/notification";

export const saveTicket = async ({
  id,
  newSolutions,
  dispatch,
  message,
}) => {
  try {
    const { data } = await clientWithAuth.post(
      "/api/v1/collection/tickets/update-one",
      {
        ticketId: id,
        newSolutions,
      },
    );
    if (data.status === "success")
      dispatch(
        updateNotification({
          message,
          type: "info",
        }),
      );
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    dispatch(
      updateNotification({
        message: errorMessage,
        type: "error",
      }),
    );
  }
};
