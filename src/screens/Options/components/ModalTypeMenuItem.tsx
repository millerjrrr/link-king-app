import { useDispatch, useSelector } from "react-redux";
import OptionsMenuItemContainer from "./OptionsMenuItemContainer";
import appTextSource from "@src/utils/appTextSource";
import MenuItemLink from "./MenuItemLink";
import { settingsState } from "@src/store/settings";

import { updateModals } from "@src/store/modals";
import { ModalWithMessage } from "@src/types/Modals";
import { Platform } from "react-native";

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
  let onPress;

  switch (optionName) {
    case "leaveAReview":
      iconName = "thumb-up-outline";
      onPress = () =>
        dispatch(updateModals({ modalShowing: name }));
      break;
    case "contactUs":
      iconName = "email-outline";
      onPress =
        Platform.OS === "web"
          ? () => {
              window.open(`https://link-king.com/contact`);
            }
          : () =>
              dispatch(
                updateModals({ modalShowing: name }),
              );
      break;
    case "logOut":
      iconName = "logout";
      onPress = () =>
        dispatch(updateModals({ modalShowing: name }));
      break;
  }

  return (
    <OptionsMenuItemContainer iconName={iconName}>
      <MenuItemLink name={linkTitle} onPress={onPress} />
    </OptionsMenuItemContainer>
  );
};

export default ModalTypeMenuItem;
