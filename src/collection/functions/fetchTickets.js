import catchAsyncError from "../../api/catchError";
import clientWithAuth from "../../api/clientWithAuth";
import { updateCollection } from "../../store/collection";
import { updateNotification } from "../../store/notification";

export const fetchTickets = async (dispatch) => {
  dispatch(
    updateCollection({
      busy: true,
      connected: true,
      searchKeyword: "",
    }),
  );
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/tickets/collection",
    ); 
    dispatch(
      updateCollection({
        tickets: data.data.tickets,
        filteredTickets: data.data.tickets,
        busy: false,
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
    dispatch(updateCollection({ connected: false }));
  }
};
