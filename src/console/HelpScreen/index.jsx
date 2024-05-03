import { View } from "react-native";
import PopUpContainer from "../../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import { HelpScroll } from "./StyledComponents";
import DescriptionWrapper from "./DescriptionWrapper";
import StatsIcon from "../StatsIcon";
import OptionsContainer from "../OptionsContainer";
import { Video, ResizeMode } from "expo-av";
import { useRef } from "react";
import colors from "../../utils/colors";
import { getConsoleState } from "../../store/console";
import KeyboardIcon from "../KeyboardAndStartButton/KeyboardIcon";

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
  const { dictionary } = useSelector(getConsoleState);
  const { heading } = appTextSource[appLang].console.help;

  const color = colors[colorScheme].CONTRAST[1];
  const backgroundColor = colors.dark.PRIMARY;
  const video = useRef(null);

  const demos = {
    "English-Portuguese": require("../../assets/demo-English-Portuguese.mp4"),
    "Spanish-English": require("../../assets/demo-Spanish-English.mp4"),
  };
  const source =
    demos[dictionary] || demos["English-Portuguese"];

  return (
    <PopUpContainer {...{ heading }}>
      <HelpScroll contentContainerStyle="center">
        <DescriptionWrapper {...{ name: "howToPlay" }}>
          <Video
            {...{
              ref: video,
              style: {
                backgroundColor,
                height: 500,
                width: 230,
                borderRadius: 20,
                shadowColor: color,
                borderColor: color,
                borderWidth: 3,
              },
              source,
              isMuted: true,
              resizeMode: ResizeMode.CONTAIN,
              isLooping: true,
              shouldPlay: true,
            }}
          />
        </DescriptionWrapper>
        <DescriptionWrapper
          {...{ name: "gameDescription" }}
        />
        <DescriptionWrapper {...{ name: "giveUp" }}>
          <KeyboardIcon
            {...{
              name: "skip-forward",
              size: 50,
            }}
          />
        </DescriptionWrapper>
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
