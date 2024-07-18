import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import APIKeys from "./APIKeys";
import { errorHandler } from "../errors/errorHandler";

const setSubscriptionPrice = async ({ setPrice }) => {
  try {
    if (Platform.OS === "android") {
      await Purchases.configure({
        apiKey: APIKeys.google,
      });
    } else {
      await Purchases.configure({
        apiKey: APIKeys.apple,
      });
    }

    const offerings = await Purchases.getOfferings();
    const price =
      offerings.current.annual.product.priceString ||
      "R$69.99";

    setPrice(price);
  } catch (e) {
    errorHandler(e, dispatch);
  }
};

export default setSubscriptionPrice;
