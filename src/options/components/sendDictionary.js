import {
  updateBusyState,
  updateDictionary,
} from "../../store/console";
import clientWithAuth from "../../api/clientWithAuth";
import { errorHandler } from "../../errors/errorHandler";

export const sendDictionary = async ({
  dictionary,
  dispatch,
}) => {
  dispatch(updateBusyState(true));
  try {
    const { data } = await clientWithAuth.post(
      "/api/users/change-dictionary",
      {
        dictionary,
      },
    );
    dispatch(updateDictionary(data.dictionary));
    dispatch(updateBusyState(false));
  } catch (error) {
    dispatch(updateBusyState(false)); //important that this comes first
    errorHandler(error, dispatch);
  }
};