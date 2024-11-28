import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { updateModals } from "@src/store/modals";
import { ComponentProps } from "react";

type MaterialCommunityIconsName = ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

const RepeatRepeatsIcon = ({
  name = "stop",
  size = 32,
}: {
  name: MaterialCommunityIconsName;
  size: number;
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const dispatch = useDispatch();
  const onPress = () =>
    dispatch(
      updateModals({ modalShowing: "repeatRepeatsModal" }),
    );

  return (
    <>
      <TouchableOpacity
        {...{ onPress, style: styles.container }}
      >
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
        />
      </TouchableOpacity>
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
