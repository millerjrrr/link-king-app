import { useEffect } from "react";
import useFetchAuthInfo from "./authHooks/useFetchAuthInfo";
import useFetchSettings from "./authHooks/useFetchSettings";
import useCheckSubscriptionStatus from "./subscriptionHooks/useCheckSubscriptionStatus";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";

const useStartUpHooks = () => {
  const fetchAuthInfo = useFetchAuthInfo();
  const checkSubscriptionStatus =
    useCheckSubscriptionStatus();
  const fetchSettings = useFetchSettings();
  const { refresh } = useSelector(authState);

  const startUpFunctions = async () => {
    await fetchAuthInfo();
    await checkSubscriptionStatus();
    await fetchSettings();
  };

  useEffect(() => {
    startUpFunctions();
  }, [refresh]);
};

export default useStartUpHooks;
