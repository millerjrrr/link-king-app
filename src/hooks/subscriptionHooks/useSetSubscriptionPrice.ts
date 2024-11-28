import Purchases from "react-native-purchases";
import { useDispatch } from "react-redux";
import useCatchAsync from "@src/hooks/useCatchAsync";
import configurePurchases from "../../utils/configurePurchases";
import { updateSubscriptionPrice } from "@src/store/auth";
import { useEffect } from "react";

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
    setSubscriptionPrice();
  }, []);
};

export default useSetSubscriptionPrice;
