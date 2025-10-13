import React, { ReactNode } from "react";
import { View, StyleSheet, Platform } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import { settingsState } from "@src/store/settings";
import HelpButton from "../Buttons/HelpButton";
import FourCrowns from "../Graphics/FourCrowns";
import BackButton from "../Buttons/BackButton";
import AppText from "../AppText";
import BusyWrapper from "../Loader/BusyWrapper";
import { authState } from "@src/store/auth";
import BottomShadow from "../BottomShadow";
import FadeBackgroundView from "../Graphics/FadeBackgroundView";

interface PopUpContainerProps {
  children: ReactNode;
  heading: string;
  help?: () => void;
  padding?: number;
  altFunction?: () => void;
}

const PopUpContainer: React.FC<PopUpContainerProps> = ({
  children,
  heading,
  help,
  padding,
  altFunction,
}) => {
  const { busy } = useSelector(authState);
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST, SECONDARY, PRIMARY } =
    colors[colorScheme];
  const color = CONTRAST[golden];
  const backgroundColor = PRIMARY;

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
      <BottomShadow />
      <FourCrowns {...{ color: SECONDARY }} />
      <HelpButton help={help} />
      <BackButton altFunction={altFunction} extraPadding />
      <LinkKingLogo
        {...{
          height: 40,
          marginTop: 40,
          tintColor: color,
        }}
      />
      <AppText style={styles.heading}>{heading}</AppText>
      <View style={styles.container}>
        <FadeBackgroundView height={20} />
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
    overflow: "hidden",
    borderRadius: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 15,
  },
});

export default PopUpContainer;
