import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import AppText from "@src/components/AppText";

const LevelLine = ({
  level,
  height,
  touched = false,
  onPress,
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
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
            ...appShadow(color),
            height: height,
          },
          styles.lineStyle,
          touched ? styles.touched : null,
        ]}
      />
      <AppText
        style={
          touched
            ? {
                fontWeight: "bold",
              }
            : null
        }
      >
        {level}
      </AppText>
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
  },
});

export default LevelLine;
