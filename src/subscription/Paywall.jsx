import { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  Linking,
  View,
} from "react-native";
import Purchases from "react-native-purchases";
import AuthButton from "../ui/Buttons/AuthButton";
import appTextSource from "../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import AppText from "../ui/AppText";
import { refreshPage } from "../store/auth";
import AuthFormContainer from "../components/containers/AuthFormContainer";
import colors from "../utils/colors";
import APIKeys from "./APIKeys";
import { errorHandler } from "../errors/errorHandler";
import { updateNotification } from "../store/notification";

const Paywall = () => {
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const onPress = async () => {
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
      console.log(offerings.current);

      if (
        offerings.current &&
        offerings.current.availablePackages.length > 0
      ) {
        await Purchases.purchasePackage(
          offerings.current.availablePackages[0],
        );
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
      dispatch(refreshPage());
    }
  };

  const { colorScheme, appLang } = useSelector(
    getSettingsState,
  );
  const { heading, title, notice, terms } =
    appTextSource[appLang].paywall;

  return (
    <AuthFormContainer {...{ heading, back: false }}>
      <ScrollView
        style={{ padding: 5, paddingVertical: 15, flex: 1 }}
      >
        <AppText
          {...{
            style: { textAlign: "left", fontSize: 20 },
          }}
        >
          {notice}
        </AppText>
        <View style={{ height: 50 }} />
      </ScrollView>
      <View
        {...{
          style: {
            width: "100%",
            paddingVertical: 20,
          },
        }}
      >
        <AppText
          {...{
            style: {
              fontSize: 15,
              textAlign: "left",
              color: colors[colorScheme].CONTRAST[1],
            },
          }}
        >
          {terms[0]}
          <Text
            {...{
              style: {
                color:
                  colors[colorScheme].INACTIVE_CONTRAST,
                textDecorationLine: "underline",
              },
              onPress: () =>
                Linking.openURL(
                  "https://www.linkoking.com/terms-of-service",
                ),
            }}
          >
            {terms[1]}
          </Text>
          {terms[2]}
          <Text
            {...{
              style: {
                color:
                  colors[colorScheme].INACTIVE_CONTRAST,
                textDecorationLine: "underline",
              },
              onPress: () =>
                Linking.openURL(
                  "https://www.linkoking.com/privacy-policy",
                ),
            }}
          >
            {terms[3]}
          </Text>{" "}
        </AppText>
      </View>
      <View
        style={{
          marginBottom: 70,
          width: "100%",
        }}
      >
        <AuthButton {...{ title, busy, onPress }} />
      </View>
    </AuthFormContainer>
  );
};

export default Paywall;
