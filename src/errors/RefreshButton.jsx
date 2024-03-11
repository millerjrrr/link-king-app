import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { refreshPage } from "../store/auth";
import { getColorsState } from "../store/colors";

const size = 200;

const RefreshButton = () => {
  const dispatch = useDispatch();

  const { colorScheme } = useSelector(getColorsState);
  const color = colors[colorScheme].RED;
  const backgroundColor = colors[colorScheme].SECONDARY;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => dispatch(refreshPage())}
        style={[
          styles.button,
          { backgroundColor, shadowColor: color },
        ]}
      >
        <Ionicons
          {...{ size: 96, name: "refresh", color }}
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
    height: size,
    width: size,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
