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
import { WalkthroughStackParamList } from "@src/types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { updateDictionary } from "@src/store/console";
import { updateBusyState } from "@src/store/auth";

const useChangeHomeLanguageForNewUser = () => {
  const { appLang } = useSelector(settingsState);
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const navigation =
    useNavigation<
      StackNavigationProp<WalkthroughStackParamList>
    >();

  const changeHomeLanguageForNewUser = catchAsync(
    async ({ newLanguage }: { newLanguage: string }) => {
      try {
        dispatch(updateBusyState(true));
        //console.log("# Changing home language");
        const { message } =
          appTextSource(newLanguage).walkthrough[
            "Choose Home Language"
          ];

        const { data } = await clientWithAuth.post(
          "/api/v1/users/change-user-home-language-for-new-user",
          { newLanguage },
        );
        if (data.status === "success") {
          navigation.navigate("Choose Home Language");
          setTimeout(
            () =>
              dispatch(
                updateNotification({
                  message: message || "error",
                  type: "info",
                }),
              ),
            300,
          );

          dispatch(
            updateSettings({ appLang: newLanguage }),
          );
          dispatch(
            updateDictionary(data.data.user.dictionary),
          );
          saveToAsyncStorage("app-lang", newLanguage);
        }
      } finally {
        dispatch(updateBusyState(false));
      }
    },
  );

  return changeHomeLanguageForNewUser;
};

export default useChangeHomeLanguageForNewUser;
