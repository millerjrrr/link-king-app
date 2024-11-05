import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { useState } from "react";
import AppModal from "../../../components/AppModal";
import { fetchConsoleInfo } from "@src/utils/consoleFunctions/fetchConsoleInfo";

const RepeatRepeatsIcon = ({
  name = "stop",
  size = 32,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);

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
