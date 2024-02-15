import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../utils/colors";
import CrownUI from "../ui/CrownUI";

const PopUpContainer = ({ children, heading }) => {
  return (
    <View style={styles.container}>
      <CrownUI
        position="top-left"
        size="50"
        rotation="150"
        color={colors.SECONDARY}
      />
      <CrownUI
        position="top-right"
        size="50"
        rotation="210"
        color={colors.SECONDARY}
      />
      <Image
        source={require("../assets/link-king-header-logo.png")}
        resizeMode="contain"
        style={{
          width: 100,
          height: 30,
          marginTop: 10,
          marginBottom: 15,
        }}
      />
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
});

export default PopUpContainer;
