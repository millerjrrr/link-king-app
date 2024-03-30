import { View } from "react-native";
import PopUpContainer from "../../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import StatsContainer from "../StatsContainer";
import OptionsContainer from "./../OptionsContainer";
import ReadWordButton from "./../ReadWordButton";
import { HelpScroll } from "./StyledComponents";
import DescriptionWrapper from "./DescriptionWrapper";

const HelpScreen = () => {
  const { appLang } = useSelector(getSettingsState);
  const { heading } = appTextSource[appLang].console.help;

  return (
    <PopUpContainer {...{ heading }}>
      <HelpScroll contentContainerStyle="center">
        <DescriptionWrapper {...{ name: "howToPlay" }} />
        <DescriptionWrapper {...{ name: "stats" }}>
          <StatsContainer />
        </DescriptionWrapper>
        <DescriptionWrapper {...{ name: "playingOptions" }}>
          <OptionsContainer />
          <ReadWordButton />
        </DescriptionWrapper>
        <View style={{ height: 30 }} />
      </HelpScroll>
    </PopUpContainer>
  );
};

export default HelpScreen;
