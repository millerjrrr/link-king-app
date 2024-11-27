import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import FourCrowns from "../Graphics/FourCrowns";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import HelpButton from "../Buttons/HelpButton";
import { settingsState } from "@src/store/settings";
import FlagBook from "../Buttons/FlagBook";
import AppText from "../AppText";
import BackButton from "../Buttons/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import BusyWrapper from "../Loader/BusyWrapper";
import { authState } from "@src/store/auth";
import BottomShadow from "../BottomShadow";

const TabScreenContainer = ({
  children,
  heading,
  help,
  noBook,
  backFunction,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { busy } = useSelector(authState);
  const { CONTRAST, SECONDARY, PRIMARY } =
    colors[colorScheme];
  const tintColor = CONTRAST[golden];
  const color = SECONDARY;

  return (
    <>
      <BottomShadow />
      <View
        style={[
          { backgroundColor: PRIMARY },
          styles.container,
        ]}
      >
        <StatusBarFiller />
        {backFunction ? (
          <BackButton
            altFunction={backFunction}
            extraPadding={true}
          />
        ) : null}
        <FourCrowns {...{ color }} />
        <HelpButton {...{ help, padding: true }} />
        {!noBook ? (
          <FlagBook {...{ padding: true }} />
        ) : null}
        <LinkKingLogo
          {...{
            height: 30,
            marginTop: 0,
            tintColor,
          }}
        />
        <AppText style={styles.heading}>{heading}</AppText>
        <BusyWrapper busy={busy} size={150}>
          {children}
        </BusyWrapper>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 5,
  },
});

export default TabScreenContainer;
