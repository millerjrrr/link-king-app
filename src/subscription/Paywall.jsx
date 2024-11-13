import { ScrollView, View } from "react-native";
import AuthButton from "@src/components/Buttons/AuthButton";
import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "@src/components/AppText";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import TermsAndConditions from "./TermsAndConditions";
import useSetSubscriptionPrice from "../hooks/subscriptionHooks/useSetSubscriptionPrice";
import { authState } from "@src/store/auth";
import useSubscribe from "../hooks/subscriptionHooks/useSubscribe";
import AppModal from "@src/components/AppModal";
import useLogOut from "./../hooks/authHooks/useLogOut";
import { useState } from "react";

const Paywall = () => {
  const subscribe = useSubscribe();

  const { appLang } = useSelector(settingsState);
  const { heading, notice, priceDescription, perYear } =
    appTextSource(appLang).paywall;

  useSetSubscriptionPrice();
  const { subscriptionPrice, busy } =
    useSelector(authState);

  // LogOutModal Logic
  const [isModalVisible, setIsModalVisible] =
    useState(false);
  const logOut = useLogOut();
  const logOutNow = async () => {
    await logOut();
    setIsModalVisible(false);
  };
  const { name } = appTextSource(appLang).options.logOut;

  return (
    <AuthFormContainer
      {...{ heading, back: false, noScrollView: true }}
    >
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
          marginVertical: 10,
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
        <AppText
          onPress={() => setIsModalVisible(true)}
          style={{ fontSize: 12 }}
        >
          {name}
        </AppText>
      </View>
      <AppModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        modalName={"logOut"}
        onPress={logOutNow}
      />
    </AuthFormContainer>
  );
};

export default Paywall;
