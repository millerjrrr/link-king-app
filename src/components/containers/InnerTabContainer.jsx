import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import StatusBarFiller from "../StatusBarFiller";
import { useSelector } from "react-redux";
import FourCrowns from "../Graphics/FourCrowns";
import LinkKingLogo from "../Graphics/LinkKingLogo";
import HelpButton from "../Buttons/HelpButton";
import { getSettingsState } from "@src/store/settings";
import FlagBook from "../Buttons/FlagBook";
import AppText from "../AppText";
import BackButton from "../Buttons/BackButton";
import { LinearGradient } from "expo-linear-gradient";

const InnerTabContainer = ({
  children,
  heading,
  help,
  noBook,
  back,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const { CONTRAST, SECONDARY, PRIMARY } =
    colors[colorScheme];
  const tintColor = CONTRAST[golden];
  const color = SECONDARY;

  return (
    <>
      <LinearGradient //bottomTab shadow for android
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 5,
          zIndex: 10,
        }}
        colors={[tintColor + "00", tintColor + "60"]}
      />
      <View
        style={[
          { backgroundColor: PRIMARY },
          styles.container,
        ]}
      >
        <StatusBarFiller />
        {back ? <BackButton extraPadding={true} /> : null}
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
        {children}
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

export default InnerTabContainer;
