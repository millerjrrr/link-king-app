import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import Paywall from "./Paywall";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";
import APIKeys from "./APIKeys";
import { errorHandler } from "../errors/errorHandler";

const IsSubscribedWrapper = ({ children }) => {
  const [access, setAccess] = useState(false);
  const { refresh, trialDays } = useSelector(getAuthState);
  const subRequired = trialDays < 0;

  useEffect(() => {
    const setup = async () => {
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

        const customerInfo =
          await Purchases.getCustomerInfo();

        setAccess(
          !subRequired ||
            customerInfo.entitlements.active["Standard"] !==
              undefined,
        );
      } catch (e) {
        errorHandler(e, dispatch);
      }
    };

    setup();
  }, [refresh, trialDays]);

  return access ? <>{children}</> : <Paywall />;
};

export default IsSubscribedWrapper;
