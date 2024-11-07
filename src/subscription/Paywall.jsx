import { ScrollView, View } from "react-native";
import AuthButton from "@src/components/Buttons/AuthButton";
import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "@src/components/AppText";
import AuthFormContainer from "@src/components/containers/AuthFormContainer";
import TermsAndConditions from "./TermsAndConditions";
import useSetSubscriptionPrice from "../hooks/subscriptionHooks/useSetSubscriptionPrice";
import { authState } from "@src/store/auth";
import useSubscribe from "../hooks/subscriptionHooks/useSubscribe";

const Paywall = () => {
  const subscribe = useSubscribe();

  const { appLang } = useSelector(settingsState);
  const { heading, notice, priceDescription, perYear } =
    appTextSource(appLang).paywall;

  useSetSubscriptionPrice();
  const { subscriptionPrice, busy } =
    useSelector(authState);

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
        <AppText style={{ fontSize: 15, marginBottom: 10 }}>
          {priceDescription + subscriptionPrice + perYear}
        </AppText>
        <AuthButton
          title={heading}
          busy={busy}
          onPress={subscribe}
        />
        <TermsAndConditions />
      </View>
    </AuthFormContainer>
  );
};

export default Paywall;
