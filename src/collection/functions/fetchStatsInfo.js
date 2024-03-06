import clientWithAuth from "../../api/clientWithAuth";
import { updateStatsState } from "./updateStatsState";
import { updateBusyState } from "../../store/stats";
import { errorHandler } from "../../errors/errorHandler";

export const fetchStatsInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  try {
    const { data } = await clientWithAuth.get(
      "/collection/statistics",
    );
    updateStatsState(data, dispatch);
  } catch (error) {
    dispatch(updateBusyState(false));
    errorHandler(error, dispatch);
  }
};
