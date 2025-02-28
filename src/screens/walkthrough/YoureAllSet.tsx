import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthButton from "@components/Buttons/AuthButton";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { updateJustSignedUp } from "@src/store/auth";
import TabScreenContainer from "@src/components/Containers/TabScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalkthroughStackParamList } from "@src/types/navigationTypes";
import Entypo from "@expo/vector-icons/Entypo";
import useColors from "@src/hooks/utilityHooks/useColors";
import AppText from "@src/components/AppText";
import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
import client from "@src/api/client";
import { updateModals } from "@src/store/modals";
import { Fill30, TouchableCard } from "./styledComponents";
import { ScrollView, View } from "react-native";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";

const YoureAllSet = () => {
  const { appLang } = useSelector(settingsState);

  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(updateJustSignedUp(false));
  };

  const {
    allSet,
    writtenInstructions,
    videoTutorial,
    skipTutorials,
    next,
  } = appTextSource(appLang).walkthrough["You're all set!"];

  const [finishButtonText, setFinishButtonText] =
    useState(skipTutorials);

  const navigation =
    useNavigation<
      StackNavigationProp<WalkthroughStackParamList>
    >();
  const backFunction = () => navigation.goBack();

  const { CONTRAST, PRIMARY } = useColors();

  const goToWrittenInstructions = () =>
    navigation.navigate("How to Play");

  const catchAsync = useCatchAsync();

  const watchVideoOnYouTube = catchAsync(async () => {
    const { data } = await client.get("/links", {
      headers: {
        "Accept-Language": appLang,
      },
      timeout: 3000,
    });
    if (data.status === "success") {
      const tutorialLink =
        appLang in data.links.tutorial
          ? data.links.tutorial[appLang]
          : data.links.tutorial.en;

      dispatch(
        updateModals({
          modalShowing: "webViewModal",
          webViewUrl: tutorialLink,
        }),
      );
      setFinishButtonText(next);
    }
  });

  return (
    <TabScreenContainer
      heading={allSet}
      noBook
      backFunction={backFunction}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FadeBackgroundView position="top" height={30} />
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 5,
          }}
        >
          <TouchableCard
            bg={PRIMARY}
            color={CONTRAST}
            onPress={goToWrittenInstructions}
          >
            <Entypo
              name="open-book"
              size={150}
              color={CONTRAST}
            />
            <AppText style={{ paddingTop: 15 }}>
              {writtenInstructions}
            </AppText>
          </TouchableCard>
          <TouchableCard
            bg={PRIMARY}
            color={CONTRAST}
            onPress={watchVideoOnYouTube}
          >
            <Entypo
              name="youtube"
              size={150}
              color={CONTRAST}
            />
            <AppText style={{ paddingTop: 15 }}>
              {videoTutorial}
            </AppText>
          </TouchableCard>
          <Fill30 />
          <AuthButton
            title={finishButtonText}
            busy={false}
            onPress={onPress}
          />
          <Fill30 />
        </ScrollView>
      </View>
    </TabScreenContainer>
  );
};

export default YoureAllSet;
