import { useSelector } from "react-redux";
import { Video, ResizeMode } from "expo-av";
import { useRef } from "react";
import colors from "../utils/colors";
import { getConsoleState } from "../store/console";
import { getSettingsState } from "../store/settings";
import { View } from "react-native";

const Gif = () => {
  const { colorScheme } = useSelector(getSettingsState);

  const { dictionary } = useSelector(getConsoleState);

  const color = colors[colorScheme].CONTRAST[1];
  const backgroundColor = colors.dark.PRIMARY;
  const video = useRef(null);

  const demos = {
    "English-Portuguese": require("../assets/demo-English-Portuguese.mp4"),
    "Spanish-English": require("../assets/demo-Spanish-English.mp4"),
  };
  const source =
    demos[dictionary] || demos["English-Portuguese"];

  return (
    <View
      {...{
        style: {
          flex: 1,
          width: "100%",
          alignItems: "center",
        },
      }}
    >
      <Video
        {...{
          ref: video,
          style: {
            backgroundColor,
            height: "100%",
            width: "100%",
            borderRadius: 20,
            shadowColor: color,
            borderColor: color,
            borderWidth: 3,
          },
          source,
          isMuted: true,
          resizeMode: ResizeMode.COVER,
          isLooping: true,
          shouldPlay: true,
        }}
      />
    </View>
  );
};

export default Gif;
