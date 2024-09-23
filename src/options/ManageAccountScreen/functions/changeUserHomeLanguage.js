import clientWithAuth from "../../../api/clientWithAuth";
import { errorHandler } from "../../../errors/errorHandler";
import { updateNotification } from "../../../store/notification";
import { updateSettings } from "../../../store/settings";
import appTextSource from "../../../utils/appTextSource/index";
import { saveToAsyncStorage } from "../../../utils/asyncStorage";

const changeUserHomeLanguage = async ({
  password,
  newLanguage,
  dispatch,
  appLang,
  navigation,
}) => {
  const message =
    appTextSource(appLang).options.manageAccount
      .homeLanguageUpdated;

  try {
    const { data } = await clientWithAuth.post(
      "/api/v1/users/change-user-home-language",
      { password, newLanguage },
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
        3000,
      );
      dispatch(updateSettings({ appLang: newLanguage }));
      saveToAsyncStorage("app-lang", newLanguage);
    }
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export default changeUserHomeLanguage;
