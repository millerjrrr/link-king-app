import appTextSource from "@src/utils/appTextSource";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import ManageAccountMenuItem from "./components/ManageAccountMenuItem";
import { authState } from "@src/store/auth";
import TabScreenContainer from "@src/components/containers/TabScreensContainer";
import useUpdateAccountDetails from "../../hooks/manageAccountHooks/useUpdateAccountDetails";

const ManageAccountScreen = ({ navigation }) => {
  const { appLang } = useSelector(settingsState);
  const { title: heading, changeHomeLanguage } =
    appTextSource(appLang).options.manageAccount;
  const { subscribed, notSubscribed, vipMessage } =
    appTextSource(appLang).options.manageAccount
      .subscriptionPage;

  const {
    accountName: name,
    accountEmail: email,
    subscribed: userIsSubscribed,
    vip,
    admin,
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
      targetScreen: "Change Account Name",
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
      targetScreen: "Manage Subscription",
    },
    homeLanguage: {
      iconName: "flag",
      heading: "homeLanguage",
      data: changeHomeLanguage,
      targetScreen: "Change Home Language - Warning",
    },
    deleteAccount: {
      iconName: "delete-alert-outline",
      heading: "deleteAccount",
      targetScreen: "Delete Account",
    },
    manageUsers: {
      iconName: "account-group-outline",
      heading: "manageUsers",
      targetScreen: "Manage Users",
    },
  };

  return (
    <TabScreenContainer
      heading={heading}
      backFunction={() => navigation.navigate("Options")}
      noBook
    >
      <ManageAccountMenuItem {...props.email} />
      <ManageAccountMenuItem {...props.name} />
      {/* <ManageAccountMenuItem {...props.subscription} /> */}
      <ManageAccountMenuItem {...props.homeLanguage} />
      <ManageAccountMenuItem {...props.deleteAccount} />
      {admin && (
        <ManageAccountMenuItem {...props.manageUsers} />
      )}
    </TabScreenContainer>
  );
};

export default ManageAccountScreen;
