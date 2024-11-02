import clientWithAuth from "@src/api/clientWithAuth";
import { errorHandler } from "@src/errors/errorHandler";
import { updateCollection } from "@src/store/collection";
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
      `/api/v1/collection/tickets?page=${page}&search=${normWord}`,
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
