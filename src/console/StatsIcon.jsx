import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../store/settings";
import { updateNotification } from "../store/notification";
import appTextSource from "../utils/appTextSource";
import AppText from "../ui/AppText";

const StatsIcon = ({
  name = "clock-outline",
  text = "",
  size = 18,
}) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );

  const color = colors[colorScheme].CONTRAST[golden];

  const dispatch = useDispatch();
  const message =
    appTextSource[appLang].console.statsMessages[name];

  const onPress = () =>
    dispatch(
      updateNotification({
        message,
        type: "info",
      }),
    );

  return (
    <TouchableOpacity
      {...{ onPress, style: styles.container }}
    >
      <MaterialCommunityIcons {...{ name, size, color }} />
      <AppText
        style={{
          fontSize: size,
          paddingLeft: 3,
        }}
      >
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});

export default StatsIcon;
