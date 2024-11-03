import clientWithAuth from "@src/api/clientWithAuth";
import { errorHandler } from "@src/errors/errorHandler";
import { updateNotification } from "@src/store/notification";
import { updateSettings } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";

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
      setTimeout(() => {
        dispatch(
          updateNotification({
            message,
            type: "info",
          }),
        );
        navigation.navigate("ManageAccountScreen");
      }, 1000);
      dispatch(updateSettings({ appLang: newLanguage }));
      saveToAsyncStorage("app-lang", newLanguage);
    }
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export default changeUserHomeLanguage;
