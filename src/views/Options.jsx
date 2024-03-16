import { removeFromAsyncStorage } from "../utils/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import InnerTabContainer from "../components/containers/InnerTabContainer";
import { updateNotification } from "../store/notification";
import OptionsMenuItem from "../options/OptionsMenuItem";
import colors from "../utils/colors";
import { getSettingsState } from "../store/settings";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "../options/ColorPickerMenuItem";

const Options = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logOut = async () => {
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));
    removeFromAsyncStorage("auth-token");
  };

  const comingSoon = () => {
    dispatch(
      updateNotification({
        message: "...coming soon...",
        type: "error",
      }),
    );
  };

  const navigateTo = (pageName) => {
    navigation.navigate(pageName);
  };

  const { colorScheme } = useSelector(getSettingsState);
  const color = colors[colorScheme].INACTIVE_CONTRAST;

  return (
    <InnerTabContainer heading="Options">
      <OptionsMenuItem
        {...{
          iconName: "target-variant",
          text: "Set daily goal",
          first: true,
          onPress: () => navigateTo("SetDailyGoalScreen"),
        }}
      />
      <OptionsMenuItem
        {...{
          iconName: "account-tie-voice",
          text: "Voice settings",
          onPress: () => navigateTo("VoiceSelectionScreen"),
        }}
      />
      <ColorPickerMenuItem />
      <OptionsMenuItem
        {...{
          iconName: "contacts",
          text: "Contact Details",
          color,
          onPress: comingSoon,
        }}
      />
      <OptionsMenuItem
        {...{
          iconName: "account-details",
          text: "Edit user details",
          color,
          onPress: comingSoon,
        }}
      />
      <OptionsMenuItem
        {...{
          iconName: "logout",
          text: "Logout",
          onPress: logOut,
        }}
      />
    </InnerTabContainer>
  );
};

export default Options;
