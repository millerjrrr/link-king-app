import { useEffect, useState } from "react";
import AppText from "../ui/AppText";
import { Platform, View } from "react-native";
import Purchases from "react-native-purchases";
import AuthFormContainer from "../components/containers/AuthFormContainer";

const SubscriptionOfferingsScreen = (props) => {
  const APIKeys = {
    apple: "appl_QgfQKNSmxGdAVCVMrVwEwRigqrx",
    google: "your_revenuecat_google_api_key",
  };
  const [currentOffering, setCurrentOffering] =
    useState(null);

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

      const offerings = await Purchases.getOfferings();
      console.log(offerings);
      console.log(
        currentOffering.availablePackages[0].product,
      );
      setCurrentOffering(offerings.current);
    };

    setup().catch(console.log);
  }, []);

  return (
    <AuthFormContainer {...{ back: false }}>
      {!currentOffering ? (
        <AppText>"Loading..."</AppText>
      ) : (
        <View>
          <AppText>
            Current Offering: {currentOffering.identifier}
          </AppText>
          <AppText>
            Package Count:{" "}
            {currentOffering.availablePackages.length}
          </AppText>
          {currentOffering.availablePackages.map((pkg) => {
            return (
              <AppText>{pkg.product.displayName}</AppText>
            );
          })}
        </View>
      )}
    </AuthFormContainer>
  );
};

export default SubscriptionOfferingsScreen;
