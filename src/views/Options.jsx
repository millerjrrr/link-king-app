import InnerTabContainer from "../components/containers/InnerTabContainer";
import OptionsMenuItem from "../options/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import ColorPickerMenuItem from "../options/ColorPickerMenuItem";
import ModalTypeMenuItem from "../options/ModalTypeMenuItem";

const Options = () => {
  const navigation = useNavigation();
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
      <ModalTypeMenuItem optionName="Contact Us" />
      <ModalTypeMenuItem optionName="Log Out" />
    </InnerTabContainer>
  );
};

export default Options;
