import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import APIKeys from "./APIKeys";
import { updateNotification } from "@src/store/notification";
import { errorHandler } from "@src/errors/errorHandler";
import { refreshPage } from "@src/store/auth";

const subscribeFunction = async ({ dispatch, setBusy }) => {
  try {
    setBusy(true);
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

    if (
      offerings.current &&
      offerings.current.availablePackages.length > 0
    ) {
      await Purchases.purchasePackage(
        offerings.current.availablePackages[0],
      );
      dispatch(refreshPage());
    } else {
      dispatch(
        updateNotification({
          message: "No available packages",
          type: "info",
        }),
      );
    }
  } catch (e) {
    errorHandler(e, dispatch);
  } finally {
    setBusy(false);
  }
};

export default subscribeFunction;
