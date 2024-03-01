import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import colors from "../utils/colors";
import CrownUI from "../ui/CrownUI";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

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
        <Image
          source={require("../assets/link-king-header-logo.png")}
          resizeMode="contain"
          tintColor={color}
          style={{
            width: 100,
            height: 30,
            marginTop: 10,
            marginBottom: 0,
          }}
        />
        <Text style={[styles.heading, { color }]}>
          {heading}
        </Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
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
    justifyContent: "tflex-start",
    marginBottom: 15,
    zIndex: 10,
  },
});

export default PopUpContainer;
