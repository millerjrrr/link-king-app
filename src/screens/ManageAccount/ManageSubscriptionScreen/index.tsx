import PopUpContainer from "../../../components/Containers/PopUpContainer";
import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import StatusPanel from "./StatusPanel";
import YourSubscriptionPanel from "./YourSubscriptionPanel";
import { Container } from "./styled";

const ManageSubscriptionScreen = () => {
  const { appLang } = useSelector(settingsState);
  const { heading } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  return (
    <PopUpContainer heading={heading} blockPopToTop={true}>
      <Container>
        <StatusPanel />
        <YourSubscriptionPanel />
      </Container>
    </PopUpContainer>
  );
};
export default ManageSubscriptionScreen;
