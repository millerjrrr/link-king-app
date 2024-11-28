import { Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OptionsMenuItemContainer from "./OptionsMenuItemContainer";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import MenuItemLink from "./MenuItemLink";
import { settingsState } from "@src/store/settings";
import useLogOut from "@src/hooks/authHooks/useLogOut";
import goToRatingPage from "@src/utils/goToRatingsInAppStore";
import { updateModals } from "@src/store/modals";
import { ModalWithMessage } from "@src/types/Modals";

const ModalTypeMenuItem = ({
  optionName,
}: {
  optionName: "leaveAReview" | "contactUs" | "logOut";
}) => {
  const { appLang } = useSelector(settingsState);
  const dispatch = useDispatch();

  const name: ModalWithMessage = (optionName +
    "Modal") as ModalWithMessage;

  const { name: linkTitle } =
    appTextSource(appLang).options[optionName];

  let iconName;

  switch (optionName) {
    case "leaveAReview":
      iconName = "thumb-up-outline";
      break;
    case "contactUs":
      iconName = "email-outline";
      break;
    case "logOut":
      iconName = "logout";
      break;
  }

  return (
    <OptionsMenuItemContainer iconName={iconName}>
      <MenuItemLink
        name={linkTitle}
        onPress={() =>
          dispatch(updateModals({ modalShowing: name }))
        }
      />
    </OptionsMenuItemContainer>
  );
};

export default ModalTypeMenuItem;
