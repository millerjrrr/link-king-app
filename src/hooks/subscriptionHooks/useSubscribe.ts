import Purchases from "react-native-purchases";
import {
  refreshPage,
  updateBusyState,
  updateSubscribed,
} from "@src/store/auth";
import { useDispatch } from "react-redux";
import configurePurchases from "../../utils/configurePurchases";
import useCatchAsync from "@src/hooks/useCatchAsync";

const useSubscribe = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const subscribe = catchAsync(async () => {
    // console.log("# Subscribing");
    try {
      dispatch(updateBusyState(true));

      await configurePurchases();

      const offerings = await Purchases.getOfferings();

      const packageToPurchase =
        offerings?.current?.availablePackages[0];
      if (!packageToPurchase) {
        throw new Error("No availabale packages");
      }

      await Purchases.purchasePackage(packageToPurchase);

      dispatch(updateSubscribed(true));
    } finally {
      dispatch(updateBusyState(false));
    }
  });

  return subscribe;
};

export default useSubscribe;
