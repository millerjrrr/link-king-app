import clientWithAuth from "../../api/clientWithAuth";
import { updateStatsState } from "./updateStatsState";
import { updateBusyState } from "../../store/stats";
import { errorHandler } from "../../errors/errorHandler";

export const fetchStatsInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/tickets/statistics",
    );
    updateStatsState(data, dispatch);
  } catch (error) {
    dispatch(updateBusyState(false));
    errorHandler(error, dispatch);
  }
};
