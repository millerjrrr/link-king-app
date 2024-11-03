import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import AppNotification from "../AppNotification";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import { getSettingsState } from "@src/store/settings";
import HelpButton from "../Buttons/HelpButton";
import FourCrowns from "../Graphics/FourCrowns";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import BackButton from "../Buttons/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import AppText from "../AppText";

export const FadeBackgroundView = styled(LinearGradient)`
  position: absolute;
  top: 0;
  alignitems: center;
  flexdirection: column;
  width: 100%;
  height: 20px;
  z-index: 20;
`;

const PopUpContainer = ({
  children,
  heading,
  help,
  blockPopToTop,
  padding,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const { CONTRAST, SECONDARY, PRIMARY } =
    colors[colorScheme];
  const color = CONTRAST[golden];
  const backgroundColor = PRIMARY;

  //close this screen every time we change bottom tab
  const navigation = useNavigation();

  useEffect(() => {
    if (!blockPopToTop) {
      const closeStackScreens = () => {
        if (navigation.canGoBack())
          navigation.dispatch(StackActions.popToTop());
      };
      const unsubscribe = navigation.addListener(
        "blur",
        closeStackScreens,
      );
      return unsubscribe;
    }
  }, [navigation]);

  return (
    <View
      style={[
        {
          backgroundColor,
          paddingHorizontal: padding || 0,
        },
        styles.container,
      ]}
    >
      <FourCrowns {...{ color: SECONDARY }} />
      <AppNotification />
      <HelpButton {...{ help }} />
      <BackButton />
      <LinkKingLogo
        {...{
          height: 40,
          marginTop: 0,
          tintColor: color,
        }}
      />
      <AppText style={styles.heading}>{heading}</AppText>
      <View style={styles.container}>
        <FadeBackgroundView
          {...{
            colors: [
              backgroundColor,
              backgroundColor + "E6",
              backgroundColor + "80",
              backgroundColor + "00",
            ],
          }}
        />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
  },
});

export default PopUpContainer;
