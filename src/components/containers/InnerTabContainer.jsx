import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../utils/colors";
import StatusBarFiller from "../../ui/StatusBarFiller";
import AppNotification from "../AppNotification";
import { useSelector } from "react-redux";
import FourCrowns from "../../ui/Graphics/FourCrowns";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import HelpButton from "../../ui/HelpButton";
import { getSettingsState } from "../../store/settings";
import FlagBook from "../../ui/FlagBook";

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
  const color = CONTRAST[golden];
  const crownColor = SECONDARY;

  return (
    <View style={styles.container}>
      <StatusBarFiller />
      <FourCrowns {...{ color: crownColor }} />
      <HelpButton {...{ help, padding: true }} />
      <FlagBook {...{ noBook, padding: true }} />
      <LinkKingLogo
        {...{
          height: 30,
          marginTop: 0,
          tintColor: color,
        }}
      />
      <Text style={[styles.heading, { color }]}>
        {heading}
      </Text>
      <AppNotification />
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
    textAlign: "center",
  },
});

export default InnerTabContainer;
