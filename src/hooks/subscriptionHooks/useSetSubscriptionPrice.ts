import Purchases from "react-native-purchases";
import { useDispatch } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import configurePurchases from "../../utils/configurePurchases";
import {
  updateAppLoadingState,
  updateSubscriptionPrice,
} from "@src/store/auth";
import { useCallback, useEffect } from "react";

const useSetSubscriptionPrice = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const setSubscriptionPrice = useCallback(
    () =>
      catchAsync(async () => {
        try {
          dispatch(updateAppLoadingState(true));
          // console.log("# Setting subscription price");
          await configurePurchases();
          const offerings = await Purchases.getOfferings();
          const price =
            offerings?.current?.annual?.product
              ?.priceString || "error";

          dispatch(updateSubscriptionPrice(price));
        } finally {
          dispatch(updateAppLoadingState(false));
        }
      }),
    [dispatch, catchAsync],
  );

  useEffect(() => {
    setSubscriptionPrice();
  }, []);
};

export default useSetSubscriptionPrice;
