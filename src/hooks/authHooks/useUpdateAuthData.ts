import {
  saveToAsyncStorage,
  secureSaveToAsyncStorage,
} from "@src/utils/asyncStorage";
import { useDispatch } from "react-redux";
import useCatchAsync from "./../useCatchAsync";
import { updateSettings } from "@src/store/settings";
import {
  updateAdmin,
  updateEmail,
  updateJustSignedUp,
  updateLatestVersion,
  updateLoggedInState,
  updateToken,
  updateTrialDays,
  updateVip,
} from "@src/store/auth";
import daysLeft from "@src/utils/daysLeft";

const useUpdateAuthData = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const updateAuthData = catchAsync(async (data) => {
    console.log(data);
    dispatch(
      updateTrialDays(daysLeft(data.userCreationDate)),
    );
    dispatch(
      updateVip(new Date(data.user.vip).getTime() || 0),
    );
    if (data.version)
      dispatch(updateLatestVersion(data.version));

    dispatch(updateAdmin(data.user.admin));
    if (data.token)
      await secureSaveToAsyncStorage(
        "auth-token",
        data.token,
      );
    await saveToAsyncStorage(
      "app-lang",
      data.user.homeLanguage,
    );
    dispatch(
      updateSettings({
        appLang: data.user.homeLanguage,
      }),
    );
    dispatch(updateToken(data.token));
    dispatch(updateJustSignedUp(data?.newUser || false));
    dispatch(updateLoggedInState(true));
    dispatch(updateEmail(""));
  });

  return updateAuthData;
};

export default useUpdateAuthData;
