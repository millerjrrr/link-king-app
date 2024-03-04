import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import colors from "../utils/colors";
import CrownUI from "../ui/graphics/CrownUI";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import AppNotification from "./AppNotification";
import LinkKingLogo from "../ui/graphics/LinkKingLogo";

const PopUpContainer = ({ children, heading }) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
  return (
    <View style={styles.container}>
      <CrownUI
        position="top-left"
        size="50"
        rotation="135"
        color={colors.SECONDARY}
      />
      <CrownUI
        position="top-right"
        size="50"
        rotation="225"
        color={colors.SECONDARY}
      />
      <View style={styles.headerContainer}>
        <LinkKingLogo
          {...{
            height: 30,
            marginTop: 10,
            tintColor: color,
          }}
        />
        <Text style={[styles.heading, { color }]}>
          {heading}
        </Text>
      </View>
      <AppNotification />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PopUpContainer;
