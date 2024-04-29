import { View } from "react-native";
import PopUpContainer from "../../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import {
  FadeBackgroundView,
  HelpScroll,
} from "./StyledComponents";
import DescriptionWrapper from "./DescriptionWrapper";
import StatsIcon from "../StatsIcon";
import OptionsContainer from "../OptionsContainer";
import colors from "../../utils/colors";

const HelpForStats = ({ name }) => {
  const lookup = {
    dueToday: "target",
    steps: "foot-print",
    time: "clock-outline",
    streak: "trophy-variant",
  };

  return (
    <DescriptionWrapper {...{ name }}>
      <StatsIcon {...{ name: lookup[name], size: 50 }} />
    </DescriptionWrapper>
  );
};

const HelpForOptions = ({ name }) => {
  const lookup = {
    listen: 1,
    read: 2,
    countdown: 3,
  };

  return (
    <DescriptionWrapper {...{ name }}>
      <OptionsContainer
        {...{ size: 40, show: lookup[name] }}
      />
    </DescriptionWrapper>
  );
};

const HelpScreen = () => {
  const { appLang, colorScheme } = useSelector(
    getSettingsState,
  );
  const { heading } = appTextSource[appLang].console.help;

  return (
    <PopUpContainer {...{ heading }}>
      <HelpScroll contentContainerStyle="center">
        <DescriptionWrapper
          {...{ name: "gameDescription" }}
        />
        <DescriptionWrapper {...{ name: "howToPlay" }} />
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
