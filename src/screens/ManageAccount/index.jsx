import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import ManageAccountMenuItem from "./components/ManageAccountMenuItem";
import { authState } from "@src/store/auth";
import TabScreenContainer from "@src/components/Containers/TabScreenContainer";
import useUpdateAccountDetails from "../../hooks/manageAccountHooks/useUpdateAccountDetails";
import { ScrollView } from "react-native";

const ManageAccountScreen = ({ navigation }) => {
  const { appLang } = useSelector(settingsState);
  const { title: heading, changeHomeLanguage } =
    appTextSource(appLang).options.manageAccount;
  const { subscribed, notSubscribed, vipMessage } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const {
    formName: name,
    formEmail: email,
    subscribed: userIsSubscribed,
    vip,
  } = useSelector(authState);

  useUpdateAccountDetails();

  const props = {
    email: {
      first: true,
      heading: "email",
      data: email,
    },
    name: {
      iconName: "square-edit-outline",
      heading: "name",
      data: name,
      targetScreen: "ChangeNameScreen",
    },
    subscription: {
      iconName: "information",
      heading: "subscription",
      data:
        vip > Date.now()
          ? vipMessage
          : userIsSubscribed
            ? subscribed
            : notSubscribed,
      targetScreen: "ManageSubscriptionScreen",
    },
    homeLanguage: {
      iconName: "flag",
      heading: "homeLanguage",
      data: changeHomeLanguage,
      targetScreen: "ChangeHomeLanguageWarningScreen",
    },
    deleteAccount: {
      iconName: "delete-alert-outline",
      heading: "deleteAccount",
      targetScreen: "DeleteAccountScreen",
    },
  };

  return (
    <TabScreenContainer
      heading={heading}
      backFunction={() => navigation.navigate("Options")}
      noBook={true}
    >
      <ManageAccountMenuItem {...props.email} />
      <ManageAccountMenuItem {...props.name} />
      <ManageAccountMenuItem {...props.subscription} />
      <ManageAccountMenuItem {...props.homeLanguage} />
      <ManageAccountMenuItem {...props.deleteAccount} />
    </TabScreenContainer>
  );
};

export default ManageAccountScreen;
