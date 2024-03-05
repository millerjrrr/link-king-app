import React from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import colors from "../../utils/colors";
import StatusBarFiller from "../../ui/StatusBarFiller";
import AppNotification from "../AppNotification";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import FourCrowns from "../../ui/Graphics/FourCrowns";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import HelpButton from "../../ui/HelpButton";

const InnerTabContainer = ({ children, heading, help }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
  const crownColor = colors.SECONDARY;
  const marginTop = StatusBar.currentHeight;

  return (
    <View style={styles.container}>
      <StatusBarFiller />
      <FourCrowns {...{ color: crownColor }} />
      <HelpButton {...{ help }} />
      <LinkKingLogo
        {...{
          height: 30,
          marginTop,
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
  },
});

export default InnerTabContainer;
