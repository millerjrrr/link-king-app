import {
  Platform,
  Text,
  View,
  StyleSheet,
} from "react-native";
import InnerTabBackground from "../components/InnerTabBackground";
import colors from "../utils/colors";
import React from "react";

const Stats = () => {
  return (
    <InnerTabBackground heading="Stats">
      <View style={[styles.container, styles.commonProp]}>
        <Text style={{ color: colors.CONTRAST }}>help</Text>
      </View>
    </InnerTabBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor: colors.SECONDARY,
  },
  ...Platform.select({
    ios: {
      commonProp: {
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    },
    android: {
      commonProp: {
        shadowColor: colors.CONTRAST,
        elevation: 10,
      },
    },
  }),
});

export default Stats;
