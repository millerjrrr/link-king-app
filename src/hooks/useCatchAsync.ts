import returnErrorMessage from "@src/utils/returnErrorMessage";
import useLogOut from "./authHooks/useLogOut";
import useAppNotification from "./useAppNotification";

type AsyncFunction = (...args: any[]) => Promise<any>;

const useCatchAsync = () => {
  const logOut = useLogOut();
  const appNotification = useAppNotification();

  const catchAsync = (asyncFunc: AsyncFunction) => {
    return async (...args: Parameters<AsyncFunction>) => {
      //console.log("# Calling function:"");
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
