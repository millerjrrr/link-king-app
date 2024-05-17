import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../utils/colors";
import StatusBarFiller from "../../ui/StatusBarFiller";
import AppNotification from "../AppNotification";
import { useSelector } from "react-redux";
import FourCrowns from "../../ui/Graphics/FourCrowns";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import HelpButton from "../../ui/Buttons/HelpButton";
import { getSettingsState } from "../../store/settings";
import FlagBook from "../../ui/Buttons/FlagBook";
import AppText from "../../ui/AppText";

const InnerTabContainer = ({
  children,
  heading,
  help,
  noBook,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const { CONTRAST, SECONDARY } = colors[colorScheme];
  const tintColor = CONTRAST[golden];
  const color = SECONDARY;

  return (
    <View style={styles.container}>
      <StatusBarFiller />
      <AppNotification />
      <FourCrowns {...{ color }} />
      <HelpButton {...{ help, padding: true }} />
      <FlagBook {...{ noBook, padding: true }} />
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
