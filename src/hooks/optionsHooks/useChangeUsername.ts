import clientWithAuth from "@src/api/clientWithAuth";
import { updateNotification } from "@src/store/notification";
import appTextSource from "../../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { settingsState } from "@src/store/settings";
import { ManageAccountStackParamList } from "@src/types/navigationTypes";
import useCatchAsync from "../useCatchAsync";

const useChangeUsername = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const navigation =
    useNavigation<
      NavigationProp<ManageAccountStackParamList>
    >();
  const { appLang } = useSelector(settingsState);

  const changeUsername = catchAsync(
    async (username: string) => {
      // console.log("# Changing username");
      const message =
        appTextSource(appLang).options.manageAccount
          .usernameUpdated;
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
    },
  );

  return changeUsername;
};

export default useChangeUsername;
