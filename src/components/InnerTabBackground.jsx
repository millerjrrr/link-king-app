import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from "react-native";
import colors from "../utils/colors";
import CrownUI from "../ui/CrownUI";
import StatusBarFiller from "./StatusBarFiller";
import AppNotification from "./AppNotification";

const InnerTabBackground = ({ children, heading }) => {
  return (
    <View style={styles.container}>
      <StatusBarFiller />
      <CrownUI
        position="top-left"
        size="96"
        rotation="135"
        color={colors.SECONDARY}
      />
      <CrownUI
        position="top-right"
        size="96"
        rotation="225"
        color={colors.SECONDARY}
      />
      <CrownUI
        position="bottom-left"
        size="96"
        rotation="45"
        color={colors.SECONDARY}
      />
      <CrownUI
        position="bottom-right"
        size="96"
        rotation="315"
        color={colors.SECONDARY}
      />
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/link-king-header-logo.png")}
          resizeMode="contain"
          style={{
            width: 100,
            height: 30,
            marginTop: StatusBar.currentHeight,
          }}
        />
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <AppNotification />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "top",
  },
  heading: {
    color: colors.CONTRAST,
    fontSize: 12,
    fontWeight: "bold",
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: -6,
      },
    ],
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "top",
    zIndex: 10,
  },
});

export default InnerTabBackground;
