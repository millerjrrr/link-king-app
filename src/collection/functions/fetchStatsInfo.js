import clientWithAuth from "@src/api/clientWithAuth";
import { updateStatsState } from "./updateStatsState";
import { updateBusyState } from "@src/store/stats";
import { errorHandler } from "@src/errors/errorHandler";

export const fetchStatsInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/collection/statistics",
    );
    updateStatsState({ data, dispatch });
  } catch (error) {
    dispatch(updateBusyState(false));
    errorHandler(error, dispatch);
  }
};
