import { Text, StyleSheet } from "react-native";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import appTextSource from "../../../utils/appTextSource";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";

const ManageSubscriptionScreen = (props) => {
  const { appLang } = useSelector(getSettingsState);
  const heading =
    appTextSource[appLang].options.manageAccount
      .subscription;

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
      <Text style={{ color: "white", fontSize: 30 }}>
        ManageSubscriptionScreen
      </Text>
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ManageSubscriptionScreen;
