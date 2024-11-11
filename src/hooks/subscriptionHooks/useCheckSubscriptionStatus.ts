import useCatchAsync from "@src/hooks/useCatchAsync";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import configurePurchases from "../../utils/configurePurchases";
import Purchases from "react-native-purchases";
import {
  updateBusyState,
  updateSubscribed,
} from "@src/store/auth";

const useCheckSubscriptionStatus = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const hasChecked = useRef(false);

  const checkSubscriptionStatus = useCallback(
    () =>
      catchAsync(async () => {
        // console.log("# Checking subscription status");
        if (hasChecked.current) return;
        //console.log("# Checking subscription status");
        dispatch(updateBusyState(true));
        await configurePurchases();
        const customerInfo =
          await Purchases.getCustomerInfo();
        dispatch(
          updateSubscribed(
            customerInfo.entitlements.active["Standard"] !==
              undefined,
          ),
        );
        dispatch(updateBusyState(false));
        hasChecked.current = true; // Mark as checked
      }),
    [dispatch, catchAsync],
  );

  useEffect(() => {
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);
};

export default useCheckSubscriptionStatus;
