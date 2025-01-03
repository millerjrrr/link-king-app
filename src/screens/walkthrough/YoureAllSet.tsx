import React from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AuthButton from "@components/Buttons/AuthButton";
import AppText from "@src/components/AppText";
import { selectConsoleState } from "@src/store/console";
import { settingsState } from "@src/store/settings";
import { languages } from "../ManageAccount/ChangeHomeLanguageScreens/SelectNewLanguageScreen/getLanguageData";
import { Video } from "expo-av";
import appTextSource from "@src/utils/appTextSource";
import screenDimensions from "@src/utils/screenDimensions";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";
import { updateJustSignedUp } from "@src/store/auth";
import TabScreenContainer from "@src/components/Containers/TabScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalkthroughStackParamList } from "@src/types/navigationTypes";
declare function require(path: string): any;

const YoureAllSet = () => {
  const { appLang } = useSelector(settingsState);
  const { dictionary } = useSelector(selectConsoleState);

  const { name: baseLanguage } =
    languages[appLang as keyof typeof languages];

  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(updateJustSignedUp(false));
  };

  let { heading, subHeading, howTo, dunno, playFor, next } =
    appTextSource(appLang).walkthrough["You're all set!"];

  howTo = howTo
    .replace("#T", dictionary)
    .replace("#N", baseLanguage);

  playFor = playFor.replace("#T", dictionary);

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

  const { height, width } = screenDimensions();
  const navigation =
    useNavigation<
      StackNavigationProp<WalkthroughStackParamList>
    >();
  const backFunction = () =>
    navigation.navigate("Choose a Language to Study");

  return (
    <TabScreenContainer
      heading={heading}
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
          height={30}
          style={{ borderRadius: 10 }}
        />
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 5,
          }}
        >
          <View style={{ height: 30 }} />
          <AppText>{subHeading}</AppText>
          <AppText>{howTo}</AppText>
          <View
            style={{
              height: height * 0.35,
              overflow: "hidden",
              margin: 20,
            }}
          >
            <Video
              style={{
                transform: [{ translateY: -height * 0.1 }],
                height: height * 0.8,
                width: width * 0.8,
              }}
              source={source}
              isMuted
              isLooping
              shouldPlay
            />
          </View>
          <AppText>{dunno}</AppText>
          <Video
            style={{
              height: width * 0.8,
              width: width * 0.8,
              margin: 20,
            }}
            source={source2}
            isMuted
            isLooping
            shouldPlay
          />
          <AppText>{playFor}</AppText>
          <View style={{ height: 50 }} />
          <AuthButton
            title={next}
            busy={false}
            onPress={onPress}
          />
          <View style={{ height: 100 }} />
        </ScrollView>
        <FadeBackgroundView
          position="bottom"
          height={30}
          style={{ borderRadius: 10 }}
        />
      </View>
    </TabScreenContainer>
  );
};

export default YoureAllSet;
