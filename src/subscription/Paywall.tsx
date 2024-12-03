import { ScrollView, View } from "react-native";
import AuthButton from "@src/components/Buttons/AuthButton";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "@src/components/AppText";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import TermsAndConditions from "./TermsAndConditions";
import useSetSubscriptionPrice from "../hooks/subscriptionHooks/useSetSubscriptionPrice";
import { authState } from "@src/store/auth";
import useSubscribe from "../hooks/subscriptionHooks/useSubscribe";
import { updateModals } from "@src/store/modals";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";

const Paywall = () => {
  const subscribe = useSubscribe();
  const dispatch = useDispatch();

  const { appLang } = useSelector(settingsState);

  const { heading, notice, priceDescription, perYear } =
    appTextSource(appLang).paywall;

  useSetSubscriptionPrice();
  const { subscriptionPrice, busy } =
    useSelector(authState);

  const { name } = appTextSource(appLang).options.logOut;

  return (
    <AuthFormContainer
      heading={heading}
      back={false}
      noScrollView
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FadeBackgroundView
          position="top"
          height={30}
          style={{ borderRadius: 10 }}
        />
        <ScrollView
          style={{
            padding: 10,
            paddingVertical: 20,
            borderRadius: 10,
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
        <FadeBackgroundView
          position="bottom"
          height={30}
          style={{ borderRadius: 10 }}
        />
      </View>
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
          onPress={() =>
            dispatch(
              updateModals({ modalShowing: "logOutModal" }),
            )
          }
          style={{ fontSize: 12 }}
        >
          {name}
        </AppText>
      </View>
    </AuthFormContainer>
  );
};

export default Paywall;
