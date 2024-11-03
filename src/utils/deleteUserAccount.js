import clientWithAuth from "@src/api/clientWithAuth";
import { errorHandler } from "@src/errors/errorHandler";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import logOut from "@src/utils/logOutDEP";

const deleteUserAccount = async ({
  password,
  dispatch,
  appLang,
}) => {
  const message =
    appTextSource(appLang).options.manageAccount
      .accountDeleted;
  try {
    const { data } = await clientWithAuth.post(
      "/api/v1/users/delete-account",
      { password },
    );
    if (data.status === "success") {
      dispatch(
        updateNotification({
          message,
          type: "info",
        }),
      );
      setTimeout(() => logOut(dispatch), 2000);
    }
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export default deleteUserAccount;
