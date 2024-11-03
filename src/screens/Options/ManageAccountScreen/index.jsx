import appTextSource from "@src/utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import ManageAccountMenuItem from "./ManageAccountMenuItem";
import PopUpContainer from "@src/components/containers/PopUpContainer";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import {
  getAuthState,
  updateEmail,
  updateName,
} from "@src/store/auth";
import { errorHandler } from "@src/errors/errorHandler";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import clientWithAuth from "@src/api/clientWithAuth";

const ManageAccountScreen = () => {
  const { appLang } = useSelector(getSettingsState);
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
  } = useSelector(getAuthState);

  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);

  const updateAccountDetails = async () => {
    try {
      setBusy(true);
      const {
        data: { username, email },
      } = await clientWithAuth.get(
        "/api/v1/users/user-details",
      );
      dispatch(updateName(username));
      dispatch(updateEmail(email));
    } catch (error) {
      errorHandler(error, dispatch);
    }
    setBusy(false);
  };

  const { refresh } = useSelector(getAuthState);
  const navigation = useNavigation();

  useEffect(() => {
    updateAccountDetails();
  }, [navigation, refresh]);

  return (
    <PopUpContainer {...{ heading, blockPopToTop: true }}>
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
    </PopUpContainer>
  );
};

export default ManageAccountScreen;
