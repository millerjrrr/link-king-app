import {
  updateBusyState,
  updateConnectedState,
} from "../../store/console";
import { updateConsoleState } from "./updateConsoleState";
import clientWithAuth from "../../api/clientWithAuth";

export const fetchConsoleInfo = async (dispatch) => {
  dispatch(updateBusyState(true));
  dispatch(updateConnectedState(true));
  try {
    const { data } = await clientWithAuth.get(
      "/api/v1/gameData/sendGameState",
    );
    updateConsoleState(data, dispatch);
  } catch (err) {
    console.log("Console error: ", err);
    dispatch(updateConnectedState(false));
  } finally {
    dispatch(updateBusyState(false));
  }
};
