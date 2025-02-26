import Purchases from "react-native-purchases";
import { useDispatch } from "react-redux";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import configurePurchases from "../../utils/configurePurchases";
import { updateSubscriptionPrice } from "@src/store/auth";
import { useEffect } from "react";
import { Platform } from "react-native";

const useSetSubscriptionPrice = () => {
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const setSubscriptionPrice = catchAsync(async () => {
    //console.log("# Setting subscription price");
    await configurePurchases();
    const offerings = await Purchases.getOfferings();
    const price =
      offerings?.current?.annual?.product?.priceString ||
      "$12.99";

    dispatch(updateSubscriptionPrice(price));
  });

  useEffect(() => {
    if (Platform.OS !== "web") setSubscriptionPrice();
  }, []);
};

export default useSetSubscriptionPrice;
