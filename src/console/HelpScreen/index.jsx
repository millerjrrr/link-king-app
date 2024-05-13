import { View } from "react-native";
import PopUpContainer from "../../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import { HelpScroll } from "./StyledComponents";
import HowToPlay from "./HowToPlay";
import SkipButtonDescription from "./SkipButtonDescription";
import HelpForStats from "./HelpForStats";
import HelpForOptions from "./HelpForOptions";
import GameDescription from "./GameDescription";

const HelpScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const { heading } = appTextSource[appLang].console.help;

  return (
    <PopUpContainer {...{ heading }}>
      <HelpScroll contentContainerStyle="center">
        <HowToPlay />
        <GameDescription />
        <SkipButtonDescription />
        <HelpForStats {...{ name: "dueToday" }} />
        <HelpForStats {...{ name: "steps" }} />
        <HelpForStats {...{ name: "time" }} />
        <HelpForStats {...{ name: "streak" }} />
        <HelpForOptions {...{ name: "listen" }} />
        <HelpForOptions {...{ name: "read" }} />
        <HelpForOptions {...{ name: "countdown" }} />
        <View {...{ style: { height: 30 } }} />
      </HelpScroll>
    </PopUpContainer>
  );
};

export default HelpScreen;
