import { useEffect } from "react";
import useFetchAuthInfo from "./authHooks/useFetchAuthInfo";
import useFetchSettings from "./authHooks/useFetchSettings";
// import useCheckSubscriptionStatus from "./subscriptionHooks/useCheckSubscriptionStatus";
import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  updateAppLoadingState,
} from "@src/store/auth";

const useStartUpHooks = () => {
  const fetchAuthInfo = useFetchAuthInfo();
  // const checkSubscriptionStatus =
  //   useCheckSubscriptionStatus();
  const fetchSettings = useFetchSettings();
  const { refresh } = useSelector(authState);
  const dispatch = useDispatch();

  const startUpFunctions = async () => {
    await fetchAuthInfo();
    // await checkSubscriptionStatus();
    await fetchSettings();
    dispatch(updateAppLoadingState(false));
  };

  useEffect(() => {
    startUpFunctions();
  }, [refresh]);
};

export default useStartUpHooks;
