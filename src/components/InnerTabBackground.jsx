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
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import ConnectedWrapper from "../errors/ConnectedWrapper";

const InnerTabBackground = ({ children, heading }) => {
  const { golden } = useSelector(getConsoleState);
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
          tintColor={colors.CONTRAST[golden]}
          style={{
            width: 100,
            height: 30,
            marginTop: StatusBar.currentHeight,
          }}
        />
        <Text
          style={[
            styles.heading,
            { color: colors.CONTRAST[golden] },
          ]}
        >
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
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
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
    zIndex: 10,
  },
});

export default InnerTabBackground;
