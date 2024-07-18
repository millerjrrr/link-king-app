import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import AuthButton from "../ui/Buttons/AuthButton";
import appTextSource from "../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import AppText from "../ui/AppText";
import AuthFormContainer from "../components/containers/AuthFormContainer";
import subscribeFunction from "./subscribeFunction";
import TermsAndConditions from "./TermsAndConditions";
import setSubscriptionPrice from "./setSubscriptionPrice";
import { useNavigation } from "@react-navigation/native";

const Paywall = () => {
  const [busy, setBusy] = useState(false);
  const [price, setPrice] = useState("R$69.99");
  const dispatch = useDispatch();

  const onPress = () =>
    subscribeFunction({ dispatch, setBusy });

  const { appLang } = useSelector(getSettingsState);
  const { heading, notice, priceDescription, perYear } =
    appTextSource[appLang].paywall;

  const update = setSubscriptionPrice({ setPrice });

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      update,
    );

    return unsubscribe;
  }, [navigation]);

  return (
    <AuthFormContainer {...{ heading, back: false }}>
      <ScrollView
        style={{
          padding: 5,
          paddingVertical: 15,
          flex: 1,
        }}
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
        style={{
          marginTop: 10,
          marginBottom: 40,
          width: "100%",
        }}
      >
        <AppText
          {...{
            style: { fontSize: 15, marginBottom: 10 },
          }}
        >
          {priceDescription + price + perYear}
        </AppText>
        <AuthButton
          {...{ title: heading, busy, onPress }}
        />
        <TermsAndConditions />
      </View>
    </AuthFormContainer>
  );
};

export default Paywall;
