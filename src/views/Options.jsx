import { removeFromAsyncStorage } from "../utils/asyncStorage";
import { useDispatch } from "react-redux";
import {
  updateLoggedInState,
  updateToken,
} from "../store/auth";
import InnerTabContainer from "../components/containers/InnerTabContainer";
import OptionsMenuItem from "../options/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "../options/ColorPickerMenuItem";
import ContactDetailsMenuItem from "../options/ContactDetailsMenuItem";

const Options = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logOut = async () => {
    dispatch(updateToken(""));
    dispatch(updateLoggedInState(false));
    removeFromAsyncStorage("auth-token");
  };

  const navigateTo = (pageName) => {
    navigation.navigate(pageName);
  };

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
      <ContactDetailsMenuItem />
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
