import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import StatusBarFiller from "../StatusBarFiller";
import React from "react";
import useColors from "@src/hooks/useColors";

interface HelpButtonProps {
  help?: () => void;
  padding?: boolean;
  nopadding?: boolean;
  tintColor?: string;
}
const HelpButton: React.FC<HelpButtonProps> = ({
  help,
  padding,
  nopadding,
  tintColor,
}) => {
  const { CONTRAST } = useColors();
  const color = tintColor || CONTRAST;

  return help ? (
    <>
      <TouchableOpacity
        onPress={help}
        style={{
          paddingVertical: nopadding ? 0 : padding ? 5 : 15,
          position: "absolute",
          top: nopadding ? 0 : 10,
          right: 0,
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {padding ? <StatusBarFiller /> : null}
        <Entypo {...{ name: "help", size: 24, color }} />
      </TouchableOpacity>
    </>
  ) : null;
};

export default HelpButton;
