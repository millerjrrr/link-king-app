import catchAsyncError from "../../api/catchError";
import clientWithAuth from "../../api/clientWithAuth";
import { errorHandler } from "../../errors/errorHandler";
import { updateCollection } from "../../store/collection";
import { updateNotification } from "../../store/notification";
import { semiNormalize } from "./semiNormalize";

export const fetchTickets = async (
  dispatch,
  searchKeyword,
  ticketsd,
  page,
) => {
  const normWord = semiNormalize(searchKeyword);
  try {
    const { data } = await clientWithAuth.get(
      `/api/v1/tickets/collection?page=${page}&search=${normWord}`,
    );

    dispatch(
      updateCollection({
        tickets: [...ticketsd, ...data.data.tickets],
        results: data.results,
        busy: false,
        allDataLoaded: data.returned < 50,
      }),
    );
  } catch (error) {
    dispatch(
      updateCollection({
        busy: false,
      }),
    );
    errorHandler(error, dispatch);
  }
};
