import useCatchAsync from "@src/hooks/useCatchAsync";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import configurePurchases from "../../utils/configurePurchases";
import Purchases from "react-native-purchases";
import {
  updateBusyState,
  updateSubscribed,
} from "@src/store/auth";
import { useFocusEffect } from "@react-navigation/native";

const useCheckSubscriptionStatus = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const checkSubscriptionStatus = useCallback(
    () =>
      catchAsync(async () => {
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
      }),
    [dispatch, catchAsync],
  );

  useFocusEffect(checkSubscriptionStatus);
};

export default useCheckSubscriptionStatus;
