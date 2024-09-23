import clientWithAuth from "../../../api/clientWithAuth";
import { errorHandler } from "../../../errors/errorHandler";
import { updateNotification } from "../../../store/notification";
import appTextSource from "./../../../utils/appTextSource/index";

const updateNameOnServer = async ({
  username,
  dispatch,
  navigation,
  appLang,
}) => {
  const message =
    appTextSource(appLang).options.manageAccount
      .usernameUpdated;
  try {
    const { data } = await clientWithAuth.post(
      "/api/v1/users/change-username",
      { username },
    );
    if (data.status === "success") {
      dispatch(
        updateNotification({
          message,
          type: "info",
        }),
      );
      setTimeout(
        () => navigation.navigate("ManageAccountScreen"),
        2000,
      );
    }
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export default updateNameOnServer;
