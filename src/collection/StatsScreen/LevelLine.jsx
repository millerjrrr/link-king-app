import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appShadow from "../../utils/appShadow";
import AppText from "../../ui/AppText";

const LevelLine = ({
  level,
  height,
  touched = false,
  onPress,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={[
          {
            backgroundColor: color,
            shadowColor: color,
            borderColor: color,
            height: height,
          },
          styles.lineStyle,
          touched ? styles.touched : null,
        ]}
      />
      <AppText>{level}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lineStyle: {
    width: 8,
    borderRadius: 6,
  },
  touched: {
    width: 12,
    ...appShadow(7),
  },
});

export default LevelLine;
