import clientWithAuth from "@src/api/clientWithAuth";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import { settingsState } from "@src/store/settings";
import useLogOut from "../authHooks/useLogOut";

const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const { appLang } = useSelector(settingsState);
  const logOut = useLogOut();

  const deleteAccount = catchAsync(async ({ password }) => {
    //console.log("# Deleting account");
    const message =
      appTextSource(appLang).options.manageAccount
        .accountDeleted;
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
      setTimeout(() => logOut(), 2000);
    }
  });

  return deleteAccount;
};

export default useDeleteAccount;
