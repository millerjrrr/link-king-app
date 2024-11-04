import clientWithAuth from "@src/api/clientWithAuth";
import { errorHandler } from "@src/errors/errorHandler";
import { updateCollection } from "@src/store/collection";
import { updateDictionary } from "@src/store/console";
import { semiNormalize } from "../semiNormalize";

export const fetchTicketsFirstBatch = async (
  dispatch,
  searchKeyword,
) => {
  const normWord = semiNormalize(searchKeyword);
  dispatch(
    updateCollection({
      page: 1,
      results: 0,
      allDataLoaded: false,
      busy: true,
    }),
  );
  try {
    const { data } = await clientWithAuth.get(
      `/api/v1/collection/tickets?page=${1}&search=${normWord}`,
    );

    dispatch(updateDictionary(data.dictionary));
    dispatch(
      updateCollection({
        results: data.results,
        tickets: data.data.tickets,
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
