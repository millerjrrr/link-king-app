import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";

const size = 200;

const RefreshButton = ({ refresh }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={refresh}
        style={[styles.button, styles.commonProp]}
      >
        <Ionicons
          size={96}
          name="refresh"
          color={colors.RED}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RefreshButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    zIndex: 10,
  },
  button: {
    borderRadius: size / 2,
    backgroundColor: colors.SECONDARY,
    height: size,
    width: size,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.RED,
  },
  ...Platform.select({
    ios: {
      commonProp: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    },
    android: {
      commonProp: {
        elevation: 3,
      },
    },
  }),
});
