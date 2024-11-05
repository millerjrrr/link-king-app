import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import DescriptionWrapper from "./DescriptionWrapper";
import { Video, ResizeMode } from "expo-av";
import { useRef } from "react";
import colors from "@src/utils/colors";
import { consoleState } from "@src/store/console";
import { Image, View } from "react-native";

const HowToPlay = () => {
  const { colorScheme } = useSelector(settingsState);

  const { dictionary } = useSelector(consoleState);

  const color = colors[colorScheme].CONTRAST[1];
  const backgroundColor = colors.dark.PRIMARY;
  const video = useRef(null);

  const demos = {
    "English-Portuguese": require("@assets/img/demos/demo-English-Portuguese.mp4"),
    "Spanish-English": require("@assets//img/demos/demo-Spanish-English.mp4"),
  };
  const source =
    dictionary === "English"
      ? demos["English-Portuguese"]
      : demos["Spanish-English"];

  const image = require("@assets//img/status-bar-filler.png");

  return (
    <DescriptionWrapper {...{ name: "howToPlay" }}>
      <View
        {...{
          backgroundColor,
          borderRadius: 20,
          shadowColor: color,
          borderColor: color,
          borderWidth: 3,
          margin: 15,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          {...{
            source: image,
            resizeMode: "repeat",
            style: {
              margin: 1,
              top: 0,
              center: 0,
              width: 100,
              height: 12,
              position: "absolute",
              borderRadius: 20,
              zIndex: 2,
            },
          }}
        />
        <Video
          {...{
            ref: video,
            style: {
              height: 250,
              width: 115,
              borderRadius: 20,
            },
            source,
            isMuted: true,
            resizeMode: ResizeMode.CONTAIN,
            isLooping: true,
            shouldPlay: true,
          }}
        />
      </View>
    </DescriptionWrapper>
  );
};

export default HowToPlay;
