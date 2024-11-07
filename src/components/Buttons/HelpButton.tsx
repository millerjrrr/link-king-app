import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import StatusBarFiller from "../StatusBarFiller";
import React from "react";

interface HelpButtonProps {
  help?: () => void;
  padding?: boolean;
}
const HelpButton: React.FC<HelpButtonProps> = ({
  help,
  padding,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  return help ? (
    <>
      <TouchableOpacity
        onPress={help}
        style={[
          styles.container,
          { paddingVertical: padding ? 5 : 15 },
        ]}
      >
        {padding ? <StatusBarFiller /> : null}
        <Entypo {...{ name: "help", size: 24, color }} />
      </TouchableOpacity>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    right: 0,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default HelpButton;
