import clientWithAuth from "../../../api/clientWithAuth";
import { errorHandler } from "../../../errors/errorHandler";
import { updateNotification } from "../../../store/notification";
import appTextSource from "../../../utils/appTextSource/index";
import logOut from "../../../utils/logOut";

const deleteUserAccount = async ({
  password,
  dispatch,
  appLang,
}) => {
  const message =
    appTextSource[appLang].options.manageAccount
      .accountDeleted;
  try {
    const { data } = await clientWithAuth.post(
      "/api/users/delete-account",
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
