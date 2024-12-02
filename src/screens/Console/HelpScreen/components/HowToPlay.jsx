import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import DescriptionWrapper from "./DescriptionWrapper";
import { Video } from "expo-av";
import { useRef } from "react";
import colors from "@src/utils/colors";
import { selectConsoleState } from "@src/store/console";
import { Platform, View } from "react-native";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";

const HowToPlay = () => {
  const { colorScheme } = useSelector(settingsState);

  const { dictionary } = useSelector(selectConsoleState);

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

  const { height, width } = screenDimensions();

  return (
    <DescriptionWrapper name="howToPlay">
      {Platform.OS !== "web" ? (
        <View
          {...{
            backgroundColor,
            borderRadius: height * 0.25 * 0.0542,
            ...appShadow(color),
            borderWidth: 1,
            margin: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Video
            ref={video}
            style={{
              height: height * 0.25,
              width: width * 0.25,
              borderRadius: height * 0.25 * 0.0542,
            }}
            source={source}
            isMuted
            isLooping
            shouldPlay
          />
        </View>
      ) : null}
    </DescriptionWrapper>
  );
};

export default HowToPlay;
