import { View } from "react-native";
import PopUpContainer from "../../../components/Containers/PopUpContainer";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { HelpScroll } from "./components/StyledComponents";
import HowToPlay from "./components/HowToPlay";
import SkipButtonDescription from "./components/SkipButtonDescription";
import HelpForStats from "./components/HelpForStats";
import HelpForOptions from "./components/HelpForOptions";
import GameDescription from "./components/GameDescription";
import React from "react";

const HelpScreen = React.memo(() => {
  const { appLang } = useSelector(settingsState);
  const { heading } = appTextSource(appLang).console.help;

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
});

export default HelpScreen;
