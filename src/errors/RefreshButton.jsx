import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import colors from "@src/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { refreshPage } from "@src/store/auth";
import { getSettingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";

const RefreshButton = ({ size = 200 }) => {
  const dispatch = useDispatch();

  const { colorScheme } = useSelector(getSettingsState);
  const color = colors[colorScheme].CONTRAST[0];
  const backgroundColor = colors[colorScheme].SECONDARY;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => dispatch(refreshPage())}
        style={[
          styles.button,
          {
            backgroundColor,
            shadowColor: color,
            borderColor: color,
            borderRadius: size / 2,
            height: size,
            width: size,
          },
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
    alignItems: "center",
    justifyContent: "center",
    ...appShadow(1),
  },
});
