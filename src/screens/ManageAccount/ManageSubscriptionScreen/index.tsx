import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import StatusPanel from "./StatusPanel";
import YourSubscriptionPanel from "./YourSubscriptionPanel";
import { Container } from "./styled";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import { authState } from "@src/store/auth";
import { Platform } from "react-native";
import AppText from "@src/components/AppText";

const ManageSubscriptionScreen = () => {
  const { appLang } = useSelector(settingsState);
  const { heading, webNotice } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;
  const { vip } = useSelector(authState);
  const expiredOrSoon =
    vip < Date.now() + 24 * 60 * 60 * 1000 * 7;

  const isWebApp = Platform.OS === "web";

  return (
    <AuthFormContainer heading={heading} noScrollView>
      <Container>
        {isWebApp ? (
          <AppText>{webNotice}</AppText>
        ) : (
          <>
            <StatusPanel />
            {expiredOrSoon ? (
              <YourSubscriptionPanel />
            ) : null}
          </>
        )}
      </Container>
    </AuthFormContainer>
  );
};
export default ManageSubscriptionScreen;
