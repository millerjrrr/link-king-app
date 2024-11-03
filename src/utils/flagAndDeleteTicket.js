import returnErrorMessage from "@src/utils/returnErrorMessage";
import clientWithAuth from "@src/api/clientWithAuth";
import { updateNotification } from "@src/store/notification";

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
    const errorMessage = returnErrorMessage(error);
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
