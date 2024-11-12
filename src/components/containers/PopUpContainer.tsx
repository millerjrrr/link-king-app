import React, { ReactNode, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import { settingsState } from "@src/store/settings";
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
import BusyWrapper from "../Loader/BusyWrapper";
import { authState } from "@src/store/auth";

export const FadeBackgroundView = styled(LinearGradient)`
  position: absolute;
  top: 0;
  alignitems: center;
  flexdirection: column;
  width: 100%;
  height: 20px;
  z-index: 20;
`;

interface PopUpContainerProps {
  children: ReactNode;
  heading: string;
  help?: () => void;
  blockPopToTop?: boolean;
  padding?: number;
}

const PopUpContainer: React.FC<PopUpContainerProps> = ({
  children,
  heading,
  help,
  blockPopToTop,
  padding,
}) => {
  const { busy } = useSelector(authState);
  const { colorScheme, golden } =
    useSelector(settingsState);
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
      <LinearGradient //bottomTab shadow for android
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 5,
          zIndex: 10,
        }}
        colors={[color + "00", color + "60"]}
      />
      <FourCrowns {...{ color: SECONDARY }} />
      <HelpButton help={help} />
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
        <BusyWrapper busy={busy} size={150}>
          {children}
        </BusyWrapper>
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
