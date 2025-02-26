import { View } from "react-native";
import AuthButton from "@src/components/Buttons/AuthButton";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "@src/components/AppText";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import TermsAndConditions from "./TermsAndConditions";
import useSetSubscriptionPrice from "../../../hooks/subscriptionHooks/useSetSubscriptionPrice";
import { authState } from "@src/store/auth";
import useSubscribe from "../../../hooks/subscriptionHooks/useSubscribe";
import { updateModals } from "@src/store/modals";
import AnnouncementContainer from "@src/components/Containers/AnnouncementContainer";

const Paywall = () => {
  const subscribe = useSubscribe();
  const dispatch = useDispatch();

  const { appLang } = useSelector(settingsState);

  const { heading, message, priceDescriptionX } =
    appTextSource(appLang).paywall;

  useSetSubscriptionPrice();
  const { subscriptionPrice, busy } =
    useSelector(authState);
  const priceDescription = priceDescriptionX.replace(
    "#X",
    subscriptionPrice,
  );

  const { name } = appTextSource(appLang).options.logOut;

  return (
    <AnnouncementContainer>
      <AuthFormContainer
        heading={heading}
        back={false}
        noScrollView
        noPadding
      >
        <AppText>{message}</AppText>
        <View style={{ height: 20 }} />
        <AppText style={{ fontSize: 15, marginBottom: 10 }}>
          {priceDescription}
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
              updateModals({
                modalShowing: "logOutModal",
              }),
            )
          }
          style={{ fontSize: 12 }}
        >
          {name}
        </AppText>
      </AuthFormContainer>
    </AnnouncementContainer>
  );
};

export default Paywall;
