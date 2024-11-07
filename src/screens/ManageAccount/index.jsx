import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import ManageAccountMenuItem from "./components/ManageAccountMenuItem";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import {
  authState,
  updateEmail,
  updateName,
} from "@src/store/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import clientWithAuth from "@src/api/clientWithAuth";
import useCatchAsync from "@src/hooks/useCatchAsync";
import InnerTabContainer from "@src/components/Containers/InnerTabContainer";

const ManageAccountScreen = () => {
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

  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();

  const [busy, setBusy] = useState(false);

  const updateAccountDetails = catchAsync(async () => {
    try {
      setBusy(true);
      const {
        data: { username, email },
      } = await clientWithAuth.get(
        "/api/v1/users/user-details",
      );
      dispatch(updateName(username));
      dispatch(updateEmail(email));
    } finally {
      setBusy(false);
    }
  });

  // const { refresh } = useSelector(authState);
  const navigation = useNavigation();

  useEffect(() => {
    updateAccountDetails();
  }, [navigation]);

  return (
    <InnerTabContainer
      heading={heading}
      backFunction={() => navigation.navigate("Options")}
      noBook={true}
    >
      <BusyWrapper {...{ busy }}>
        <ManageAccountMenuItem
          {...{
            first: true,
            heading: "email",
            data: email,
          }}
        />
        <ManageAccountMenuItem
          {...{
            iconName: "square-edit-outline",
            heading: "name",
            data: name,
            targetScreen: "ChangeNameScreen",
          }}
        />
        <ManageAccountMenuItem
          {...{
            iconName: "information",
            heading: "subscription",
            data:
              vip > Date.now()
                ? vipMessage
                : userIsSubscribed
                  ? subscribed
                  : notSubscribed,
            targetScreen: "ManageSubscriptionScreen",
          }}
        />
        <ManageAccountMenuItem
          {...{
            iconName: "flag",
            heading: "homeLanguage",
            data: changeHomeLanguage,
            targetScreen: "ChangeHomeLanguageWarningScreen",
          }}
        />
        <ManageAccountMenuItem
          {...{
            iconName: "delete-alert-outline",
            heading: "deleteAccount",
            targetScreen: "DeleteAccountScreen",
          }}
        />
      </BusyWrapper>
    </InnerTabContainer>
  );
};

export default ManageAccountScreen;
