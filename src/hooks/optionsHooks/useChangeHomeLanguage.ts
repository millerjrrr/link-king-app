import { useNavigation } from "@react-navigation/native";
import clientWithAuth from "@src/api/clientWithAuth";
import { updateNotification } from "@src/store/notification";
import {
  settingsState,
  updateSettings,
} from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { saveToAsyncStorage } from "@src/utils/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "../utilityHooks/useCatchAsync";
import { ManageAccountStackParamList } from "@src/types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { updateDictionary } from "@src/store/console";

const useChangeHomeLanguage = () => {
  const { appLang } = useSelector(settingsState);
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const navigation =
    useNavigation<
      StackNavigationProp<ManageAccountStackParamList>
    >();

  const changeHomeLanguage = catchAsync(
    async ({
      password,
      newLanguage,
    }: {
      password: string;
      newLanguage: string;
    }) => {
      //console.log("# Changing home language");
      const message =
        appTextSource(appLang).options.manageAccount
          .homeLanguageUpdated;

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
          navigation.navigate("Manage Account");
        }, 1000);
        dispatch(updateSettings({ appLang: newLanguage }));
        dispatch(
          updateDictionary(data.data.user.dictionary),
        );
        saveToAsyncStorage("app-lang", newLanguage);
      }
    },
  );

  return changeHomeLanguage;
};

export default useChangeHomeLanguage;
