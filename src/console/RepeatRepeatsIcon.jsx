import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import { updateNotification } from "../store/notification";
import appTextSource from "../utils/appTextSource";
import AppText from "../ui/AppText";
import { useState } from "react";
import AppModal from "./../ui/AppModal";
import { fetchConsoleInfo } from "./functions/fetchConsoleInfo";

const RepeatRepeatsIcon = ({
  name = "stop",
  size = 32,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );

  const color = colors[colorScheme].CONTRAST[golden];

  const dispatch = useDispatch();

  const callback = () =>
    fetchConsoleInfo({
      dispatch,
      repeatRepeats: true,
    });

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const onPress = () => setIsModalVisible(true);

  return (
    <>
      <TouchableOpacity
        {...{ onPress, style: styles.container }}
      >
        <MaterialCommunityIcons
          {...{ name, size, color }}
        />
      </TouchableOpacity>
      <AppModal
        {...{
          isVisible: isModalVisible,
          onBackdropPress: () => setIsModalVisible(false),
          modalName: "repeatRepeats",
          onPress: () => {
            setIsModalVisible(false);
            callback();
          },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});

export default RepeatRepeatsIcon;
