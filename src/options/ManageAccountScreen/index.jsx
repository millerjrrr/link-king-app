import appTextSource from "../../utils/appTextSource";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import ManageAccountMenuItem from "./ManageAccountMenuItem";
import PopUpContainer from "../../components/containers/PopUpContainer";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import {
  getAuthState,
  updateBusyState,
  updateEmail,
  updateName,
} from "../../store/auth";
import { errorHandler } from "../../errors/errorHandler";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import clientWithAuth from "../../api/clientWithAuth";

const ManageAccountScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const { title: heading } =
    appTextSource[appLang].options.manageAccount;

  const { formName: name, formEmail: email } =
    useSelector(getAuthState);

  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);

  const updateAccountDetails = async () => {
    try {
      setBusy(true);
      const {
        data: { username, email },
      } = await clientWithAuth.get(
        "/api/users/user-details",
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
    console.log("update");
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
            targetScreen: "ManageSubscriptionScreen",
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
