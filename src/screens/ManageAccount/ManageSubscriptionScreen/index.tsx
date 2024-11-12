import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import StatusPanel from "./StatusPanel";
import YourSubscriptionPanel from "./YourSubscriptionPanel";
import { Container } from "./styled";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import { authState } from "@src/store/auth";

const ManageSubscriptionScreen = () => {
  const { appLang } = useSelector(settingsState);
  const { heading } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;
  const { vip } = useSelector(authState);
  const expiredOrSoon =
    vip < Date.now() + 24 * 60 * 60 * 1000 * 7;
  return (
    <AuthFormContainer heading={heading}>
      <Container>
        <StatusPanel />
        {expiredOrSoon ? <YourSubscriptionPanel /> : null}
      </Container>
    </AuthFormContainer>
  );
};
export default ManageSubscriptionScreen;
