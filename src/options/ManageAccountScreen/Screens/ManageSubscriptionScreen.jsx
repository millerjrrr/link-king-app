import PopUpContainer from "../../../components/containers/PopUpContainer";
import appTextSource from "../../../utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import AppText from "../../../ui/AppText";

const ManageSubscriptionScreen = (props) => {
  const { appLang } = useSelector(getSettingsState);
  const heading =
    appTextSource[appLang].options.manageAccount
      .subscription;

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <AppText>ManageSubscriptionScreen</AppText>
    </PopUpContainer>
  );
};
export default ManageSubscriptionScreen;
