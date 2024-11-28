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
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@src/utils/colors";
import { updateModals } from "@src/store/modals";

const FadeBackgroundView = styled(LinearGradient)<{
  position: string;
}>`
  position: absolute;
  ${(props) => props.position}:0;
  width: 100%;
  height: 30px;
  z-index: 20;
  border-radius: 10px;
`;

const Paywall = () => {
  const subscribe = useSubscribe();
  const dispatch = useDispatch();

  const { appLang, colorScheme } =
    useSelector(settingsState);
  const { PRIMARY: backgroundColor } = colors[colorScheme];

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
      noScrollView={true}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FadeBackgroundView
          position="top"
          colors={[
            backgroundColor,
            backgroundColor + "E6",
            backgroundColor + "80",
            backgroundColor + "00",
          ]}
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
          colors={[
            backgroundColor + "00",
            backgroundColor + "80",
            backgroundColor + "E6",
            backgroundColor,
          ]}
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
