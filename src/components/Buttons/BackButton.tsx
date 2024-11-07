import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { useNavigation } from "@react-navigation/native";
import React from "react";

interface BackButtonProps {
  extraPadding?: boolean;
  altFunction?: () => void;
}
const BackButton: React.FC<BackButtonProps> = ({
  extraPadding,
  altFunction,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const navigation = useNavigation();
  const onPress =
    altFunction || (() => navigation.goBack());

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          {
            paddingVertical: extraPadding ? 45 : 15,
            paddingRight: 15,
          },
        ]}
      >
        <Entypo
          {...{
            name: "chevron-small-left",
            size: 48,
            color,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default BackButton;
