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
import { Platform } from "react-native";

const useCheckSubscriptionStatusAndFetchAuthInfo = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const fetchAuthInfo = useFetchAuthInfo();
  const hasChecked = useRef(false);

  const checkSubscriptionStatusAndFetchAuthInfo =
    catchAsync(async () => {
      //console.log("# Checking subscription status");
      dispatch(updateBusyState(true));
      await fetchAuthInfo();
      if (hasChecked.current) return;
      if (Platform.OS !== "web") {
        await configurePurchases();
        const customerInfo =
          await Purchases.getCustomerInfo();
        dispatch(
          updateSubscribed(
            customerInfo.entitlements.active["Standard"] !==
              undefined,
          ),
        );
      }
      hasChecked.current = true; // Mark as checked
      dispatch(updateBusyState(false));
    });

  return checkSubscriptionStatusAndFetchAuthInfo;
};

export default useCheckSubscriptionStatusAndFetchAuthInfo;
