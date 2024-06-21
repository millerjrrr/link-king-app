import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import Paywall from "./Paywall";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";

const IsSubscribedWrapper = ({ children }) => {
  const APIKeys = {
    apple: "appl_QgfQKNSmxGdAVCVMrVwEwRigqrx",
    google: "your_revenuecat_google_api_key",
  };

  const [access, setAccess] = useState(false);
  const { subRequired } = useSelector(getAuthState);

  useEffect(() => {
    const setup = async () => {
      if (Platform.OS == "android") {
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
    };

    setup().catch(console.log);
  }, []);

  return access ? <>{children}</> : <Paywall />;
};

export default IsSubscribedWrapper;
