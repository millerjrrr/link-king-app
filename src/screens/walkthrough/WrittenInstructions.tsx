import React from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AuthButton from "@components/Buttons/AuthButton";
import { selectConsoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import { languages } from "../ManageAccount/ChangeHomeLanguageScreens/SelectNewLanguageScreen/getLanguageData";
import appTextSource from "@src/utils/appTextSource";
import screenDimensions from "@src/utils/screenDimensions";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";
import { updateJustSignedUp } from "@src/store/auth";
import TabScreenContainer from "@src/components/containers/TabScreensContainer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalkthroughStackParamList } from "@src/types/navigationTypes";
import {
  Fill30,
  TextBlock,
  VidCard,
} from "./styledComponents";
import { useVideoPlayer, VideoView } from "expo-video";
declare function require(path: string): any;

const WrittenInstructions = () => {
  const { appLang } = useSelector(settingsState);
  const { dictionary } = useSelector(selectConsoleState);

  const { nativeName: baseLanguage } =
    languages[appLang as keyof typeof languages];

  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(updateJustSignedUp(false));
  };

  let {
    howToPlay,
    subHeading,
    howTo,
    dunno,
    playFor,
    next,
  } = appTextSource(appLang).walkthrough["You're all set!"];

  const languageNames =
    appTextSource(appLang).languageNames;

  const translatedDictionary =
    dictionary in languageNames
      ? languageNames[
          dictionary as keyof typeof languageNames
        ]
      : dictionary;

  howTo = howTo
    .replace("#T", translatedDictionary)
    .replace("#N", baseLanguage);

  playFor = playFor.replace("#T", translatedDictionary);

  // REQUIRE VIDEOS
  const demoEnglishPortuguese = require("@assets/img/demos/demo-English-Portuguese.mp4");
  const demoSpanishEnglish = require("@assets/img/demos/demo-Spanish-English.mp4");
  const demoSolutionsEnglishPortuguese = require("@assets/img/demos/demo-solutions-English-Portuguese.mp4");
  const demoSolutionsSpanishEnglish = require("@assets/img/demos/demo-solutions-Spanish-English.mp4");
  const source =
    dictionary !== "English"
      ? demoSpanishEnglish
      : demoEnglishPortuguese;

  const source2 =
    dictionary !== "English"
      ? demoSolutionsSpanishEnglish
      : demoSolutionsEnglishPortuguese;

  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const player2 = useVideoPlayer(source2, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const { height, base } = screenDimensions();
  const navigation =
    useNavigation<
      StackNavigationProp<WalkthroughStackParamList>
    >();
  const backFunction = () => navigation.goBack();

  return (
    <TabScreenContainer
      heading={howToPlay}
      noBook
      backFunction={backFunction}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FadeBackgroundView
          position="top"
          height={base * 30}
        />
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            width: "100%",
            paddingHorizontal: base * 5,
          }}
        >
          <Fill30 />
          <TextBlock text={subHeading} />
          <TextBlock text={howTo} />
          <VidCard height={height * 0.3}>
            <VideoView
              style={{
                transform: [{ translateY: base * 75 }],
                height: height * 0.9,
                aspectRatio: 1,
                borderRadius: base * 15,
              }}
              nativeControls={false}
              player={player}
            />
          </VidCard>
          <TextBlock text={dunno} />
          <VidCard height={height * 0.3}>
            <VideoView
              style={{
                transform: [{ translateY: -80 }],
                height: height * 0.4,
                aspectRatio: 1,
                borderRadius: 15,
              }}
              nativeControls={false}
              player={player2}
            />
          </VidCard>
          <TextBlock text={playFor} />
          <View style={{ height: base * 50 }} />
          <AuthButton
            title={next}
            busy={false}
            onPress={onPress}
          />
          <View style={{ height: base * 100 }} />
        </ScrollView>
      </View>
    </TabScreenContainer>
  );
};

export default WrittenInstructions;
