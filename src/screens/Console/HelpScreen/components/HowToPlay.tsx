import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import DescriptionWrapper from "./DescriptionWrapper";
import { ResizeMode, Video } from "expo-av";
import { useRef } from "react";
import colors from "@src/utils/colors";
import { selectConsoleState } from "@src/store/console";
import { Platform, View } from "react-native";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
import Entypo from "@expo/vector-icons/Entypo";
import useColors from "@src/hooks/utilityHooks/useColors";
import AppLink from "@src/components/AppLink";
import { useNavigation } from "@react-navigation/native";
import { ConsoleStackParamList } from "@src/types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import appTextSource from "@src/utils/appTextSource";
declare function require(path: string): any;

const HowToPlay = () => {
  const { colorScheme, appLang } =
    useSelector(settingsState);

  const { learnMore } = appTextSource(appLang).console.help;

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

  const { height } = screenDimensions();

  const { CONTRAST } = useColors();

  const navigation =
    useNavigation<
      StackNavigationProp<ConsoleStackParamList>
    >();

  return (
    Platform.OS !== "web" && (
      <DescriptionWrapper name="howToPlay">
        <View
          style={{
            backgroundColor,
            borderRadius: height * 0.25 * 0.0542,
            ...appShadow(color),
            borderWidth: 1,
            margin: 15,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Video
            ref={video}
            style={{
              height: height * 0.3,
              width: "100%",
              borderRadius: height * 0.25 * 0.0542,
            }}
            resizeMode={ResizeMode.COVER}
            source={source}
            isMuted
            isLooping
            shouldPlay
          />
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
            size={10}
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
