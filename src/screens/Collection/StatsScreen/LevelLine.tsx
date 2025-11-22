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
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const LevelLine: React.FC<{
  level: number;
  height: number;
  touched?: boolean;
  onPress: () => void;
}> = ({ level, height, touched = false, onPress }) => {
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
        style={{
          fontWeight: touched ? "bold" : undefined,
        }}
      >
        {level}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lineStyle: {
    width: base * 8,
    borderRadius: base * 6,
  },
  touched: {
    width: base * 12,
  },
});

export default LevelLine;
