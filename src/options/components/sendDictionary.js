import {
  updateBusyState,
  updateDictionary,
} from "@src/store/console";
import clientWithAuth from "@src/api/clientWithAuth";
import { errorHandler } from "@src/errors/errorHandler";

export const sendDictionary = async ({
  dictionary,
  dispatch,
}) => {
  dispatch(updateBusyState(true));
  try {
    const { data } = await clientWithAuth.post(
      "/api/v1/users/change-dictionary",
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
