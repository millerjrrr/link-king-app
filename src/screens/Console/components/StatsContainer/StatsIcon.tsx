import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { updateNotification } from "@src/store/notification";
import appTextSource from "@src/utils/appTextSource";
import AppText from "../../../../components/AppText";
import { ConsoleStatsMessages } from "@assets/text/interface";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface StatsIconProps {
  name?: keyof typeof MaterialCommunityIcons.glyphMap;
  text?: string | number;
  size?: number;
}

const StatsIcon: React.FC<StatsIconProps> = ({
  name = "clock-outline",
  text = "",
  size = base * 18,
}) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);

  const color = colors[colorScheme].CONTRAST[golden];

  const dispatch = useDispatch();
  const message =
    appTextSource(appLang).console.statsMessages[
      name as keyof ConsoleStatsMessages
    ];

  const onPress = () =>
    dispatch(
      updateNotification({
        message,
        type: "info",
      })
    );

  return (
    <TouchableOpacity
      {...{ onPress, style: styles.container }}
    >
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
      />
      <AppText
        style={{
          fontSize: size,
          paddingLeft: base * 3,
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
    paddingHorizontal: base * 8,
  },
});

export default StatsIcon;
