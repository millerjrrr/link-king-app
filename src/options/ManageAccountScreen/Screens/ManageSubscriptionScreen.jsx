import PopUpContainer from "../../../components/containers/PopUpContainer";
import appTextSource from "../../../utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import AppText from "../../../ui/AppText";

const ManageSubscriptionScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const { subscription: heading, subscriptionDetails } =
    appTextSource[appLang].options.manageAccount;

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <AppText style={{ padding: 15 }}>
        {subscriptionDetails}
      </AppText>
    </PopUpContainer>
  );
};
export default ManageSubscriptionScreen;
