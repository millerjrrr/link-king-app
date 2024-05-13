import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import DescriptionWrapper from "./DescriptionWrapper";
import { Video, ResizeMode } from "expo-av";
import { useRef } from "react";
import colors from "../../utils/colors";
import { getConsoleState } from "../../store/console";

const HowToPlay = () => {
  const { colorScheme } = useSelector(getSettingsState);

  const { dictionary } = useSelector(getConsoleState);

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
    <DescriptionWrapper {...{ name: "howToPlay" }}>
      <Video
        {...{
          ref: video,
          style: {
            backgroundColor,
            height: 250,
            width: 115,
            borderRadius: 20,
            shadowColor: color,
            borderColor: color,
            borderWidth: 3,
            margin: 15,
          },
          source,
          isMuted: true,
          resizeMode: ResizeMode.CONTAIN,
          isLooping: true,
          shouldPlay: true,
        }}
      />
    </DescriptionWrapper>
  );
};

export default HowToPlay;
