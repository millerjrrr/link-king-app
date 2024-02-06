import { updateBusyState } from "../../store/console";
import { updateConsoleState } from "./updateConsoleState";
import clientWithAuth from "../../api/clientWithAuth";

export const fetchConsoleInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/gameData/sendGameState",
    );
    updateConsoleState(data, dispatch);
  } catch (err) {
    console.log("Console error: ", err);
  } finally {
    dispatch(updateBusyState(false));
  }
};
