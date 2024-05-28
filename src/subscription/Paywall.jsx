import { useState } from "react";
import { Platform, View } from "react-native";
import Purchases from "react-native-purchases";
import AuthButton from "../ui/Buttons/AuthButton";
import Gif from "./Gif";
import appTextSource from "../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import InnerTabContainer from "../components/containers/InnerTabContainer";
import AppText from "../ui/AppText";
import colors from "../utils/colors";
import { refreshPage } from "../store/auth";

const Paywall = () => {
  const APIKeys = {
    apple: "appl_QgfQKNSmxGdAVCVMrVwEwRigqrx",
    google: "your_revenuecat_google_api_key",
  };

  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const onPress = async () => {
    try {
      setBusy(true);

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

      await Purchases.purchasePackage(
        offerings.current.availablePackages[0],
      );
    } catch (e) {
      console.log(e);
    } finally {
      setBusy(false);
      dispatch(refreshPage());
    }
  };

  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const { heading, title, promotion } =
    appTextSource[appLang].paywall;

  return (
    <InnerTabContainer {...{ heading, noBook: true }}>
      <View
        style={{
          flex: 1,
          width: "80%",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <AppText
          {...{
            style: { color: colors[colorScheme].RED },
          }}
        >
          {promotion}
        </AppText>
        <Gif />
        <View style={{ marginVertical: 15, width: "100%" }}>
          <AuthButton {...{ title, busy, onPress }} />
        </View>
      </View>
    </InnerTabContainer>
  );
};

export default Paywall;
