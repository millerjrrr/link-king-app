import { updateConnectedState } from "@src/store/auth";
import returnErrorMessage from "@src/utils/returnErrorMessage";
import { useDispatch } from "react-redux";
import useLogOut from "./authHooks/useLogOut";
import useAppNotification from "./useAppNotification";

type AsyncFunction = (...args: any[]) => Promise<any>;

const useCatchAsync = () => {
  const dispatch = useDispatch();
  const logOut = useLogOut();
  const appNotification = useAppNotification();

  const catchAsync = (asyncFunc: AsyncFunction) => {
    return async (...args: Parameters<AsyncFunction>) => {
      // console.log(`Calling function:`);
      try {
        return await asyncFunc(...args);
      } catch (error) {
        let errorMessage = returnErrorMessage(error);
        // Network Timeout Handling
        if (
          errorMessage.startsWith("timeout") ||
          errorMessage.startsWith("Network Error")
        ) {
          errorMessage = "no internet connection";
          // dispatch(updateConnectedState(false));
        }

        // Authentication Handling (JWT Expiry)
        if (
          errorMessage.startsWith("jwt expired") ||
          errorMessage.startsWith("Your token has expired!")
        ) {
          logOut();
        } else {
          appNotification("error", errorMessage);
        }
      }
    };
  };

  return catchAsync;
};

export default useCatchAsync;
