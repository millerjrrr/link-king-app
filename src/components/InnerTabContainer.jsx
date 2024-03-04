import React from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import colors from "../utils/colors";
import StatusBarFiller from "../ui/StatusBarFiller";
import AppNotification from "./AppNotification";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import FourCrowns from "../ui/graphics/FourCrowns";
import LinkKingLogo from "../ui/graphics/LinkKingLogo";

const InnerTabContainer = ({ children, heading }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
  const crownColor = colors.SECONDARY;
  const marginTop = StatusBar.currentHeight;
  return (
    <View style={styles.container}>
      <StatusBarFiller />
      <FourCrowns {...{ color: crownColor }} />
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
  },
});

export default InnerTabContainer;
