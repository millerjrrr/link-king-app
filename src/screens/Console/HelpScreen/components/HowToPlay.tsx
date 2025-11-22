import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import DescriptionWrapper from "./DescriptionWrapper";
import { selectConsoleState } from "@src/store/console";
import { Platform, View } from "react-native";
import screenDimensions from "@src/utils/screenDimensions";
import Entypo from "@expo/vector-icons/Entypo";
import useColors from "@src/hooks/utilityHooks/useColors";
import AppLink from "@src/components/AppLink";
import { useNavigation } from "@react-navigation/native";
import { ConsoleStackParamList } from "@src/types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import appTextSource from "@src/utils/appTextSource";
import { useVideoPlayer, VideoView } from "expo-video";
declare function require(path: string): any;

const HowToPlay = () => {
  const { appLang } = useSelector(settingsState);

  const { learnMore } = appTextSource(appLang).console.help;

  const { dictionary } = useSelector(selectConsoleState);

  const { CONTRAST, INACTIVE_CONTRAST, PRIMARY } =
    useColors();

  const demos = {
    "English-Portuguese": require("@assets/img/demos/demo-English-Portuguese.mp4"),
    "Spanish-English": require("@assets//img/demos/demo-Spanish-English.mp4"),
  };
  const videoSource =
    dictionary === "English"
      ? demos["English-Portuguese"]
      : demos["Spanish-English"];

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const { height, base } = screenDimensions();

  const navigation =
    useNavigation<
      StackNavigationProp<ConsoleStackParamList>
    >();

  return (
    Platform.OS !== "web" && (
      <DescriptionWrapper name="howToPlay">
        <View
          style={{
            backgroundColor: PRIMARY,
            borderRadius: height * 0.25 * 0.0542,
            borderColor: INACTIVE_CONTRAST,
            borderWidth: base * 3,
            margin: base * 15,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              height: height * 0.2,
              borderRadius: height * 0.25 * 0.0542,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VideoView
              player={player}
              nativeControls={false}
              style={{
                transform: [{ translateY: base * 50 }],
                height: 0.7 * height,
                aspectRatio: 1,
                borderRadius: height * 0.25 * 0.0542,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Entypo
            name="open-book"
            size={base * 10}
            color={CONTRAST}
          />
          <AppLink
            title={learnMore}
            onPress={() =>
              navigation.navigate("You're all set!")
            }
          />
        </View>
      </DescriptionWrapper>
    )
  );
};

export default HowToPlay;
