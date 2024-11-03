import returnErrorMessage from "@src/utils/returnErrorMessage";
import clientWithAuth from "@src/api/clientWithAuth";
import { updateNotification } from "@src/store/notification";

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
    const errorMessage = returnErrorMessage(error);
    dispatch(
      updateNotification({
        message: errorMessage,
        type: "error",
      }),
    );
  }
};
