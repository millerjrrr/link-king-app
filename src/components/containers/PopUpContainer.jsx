import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import CrownUI from "../../ui/Graphics/CrownUI";
import { useSelector } from "react-redux";
import AppNotification from "../AppNotification";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import { getColorsState } from "../../store/colors";

const PopUpContainer = ({ children, heading }) => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const { CONTRAST, SECONDARY } = colors[colorScheme];
  const color = CONTRAST[golden];
  return (
    <View style={styles.container}>
      <CrownUI
        position="top-left"
        size="50"
        rotation="135"
        color={SECONDARY}
      />
      <CrownUI
        position="top-right"
        size="50"
        rotation="225"
        color={SECONDARY}
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
