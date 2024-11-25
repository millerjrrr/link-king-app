import useCatchAsync from "@src/hooks/useCatchAsync";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import configurePurchases from "../../utils/configurePurchases";
import Purchases from "react-native-purchases";
import {
  updateBusyState,
  updateSubscribed,
} from "@src/store/auth";
import useFetchAuthInfo from "../authHooks/useFetchAuthInfo";

const useCheckSubscriptionStatus = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const fetchAuthInfo = useFetchAuthInfo();
  const hasChecked = useRef(false);

  const checkSubscriptionStatus = catchAsync(async () => {
    console.log("# Checking subscription status");
    await fetchAuthInfo();
    if (hasChecked.current) return;
    console.log("# Checking subscription status");
    dispatch(updateBusyState(true));
    await configurePurchases();
    const customerInfo = await Purchases.getCustomerInfo();
    dispatch(
      updateSubscribed(
        customerInfo.entitlements.active["Standard"] !==
          undefined,
      ),
    );
    dispatch(updateBusyState(false));
    hasChecked.current = true; // Mark as checked
  });

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);
};

export default useCheckSubscriptionStatus;
