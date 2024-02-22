import catchAsyncError from "../../api/catchError";
import clientWithAuth from "../../api/clientWithAuth";
import { updateCollection } from "../../store/collection";
import { updateNotification } from "../../store/notification";
import { semiNormalize } from "./semiNormalize";

export const fetchTicketsFirstBatch = async (
  dispatch,
  searchKeyword,
) => {
  const normWord = semiNormalize(searchKeyword);
  dispatch(
    updateCollection({
      page: 1,
      allDataLoaded: false,
      busy: true,
      connected: true,
    }),
  );
  try {
    const { data } = await clientWithAuth.get(
      `/api/v1/tickets/collection?page=${1}&search=${normWord}`,
    );

    dispatch(
      updateCollection({
        tickets: data.data.tickets,
        busy: false,
        allDataLoaded: data.returned < 50,
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
