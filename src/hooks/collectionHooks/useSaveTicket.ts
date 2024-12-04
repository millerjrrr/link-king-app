import returnErrorMessage from "@src/utils/returnErrorMessage";
import clientWithAuth from "@src/api/clientWithAuth";
import { updateNotification } from "@src/store/notification";
import { useDispatch, useSelector } from "react-redux";
import appTextSource from "@src/utils/appTextSource";
import { settingsState } from "@src/store/settings";
import { updateSelectedTicket } from "@src/store/collection";

const useSaveTicket = () => {
  const { appLang } = useSelector(settingsState);
  const { message } =
    appTextSource(appLang).console.editTicketScreen;
  const dispatch = useDispatch();

  const saveTicket = async (
    id: string,
    newSolutions: Array<string>,
  ) => {
    try {
      const { data } = await clientWithAuth.post(
        "/api/v1/collection/tickets/update-one",
        {
          ticketId: id,
          newSolutions,
        },
      );
      if (data.status === "success") {
        dispatch(updateSelectedTicket(data.ticket));
        dispatch(
          updateNotification({
            message,
            type: "info",
          }),
        );
      }
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

  return saveTicket;
};

export default useSaveTicket;
