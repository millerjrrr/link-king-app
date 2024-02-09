import { updateBusyState } from "../../store/stats";
import { updateStatsState } from "./updateStatsState";
import clientWithAuth from "../../api/clientWithAuth";

export const fetchStatsInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/tickets/statistics",
    );
    updateStatsState(data, dispatch);
  } catch (err) {
    console.log("Stats error: ", err);
  } finally {
    dispatch(updateBusyState(false));
  }
};
