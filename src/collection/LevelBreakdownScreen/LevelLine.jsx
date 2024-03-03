import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getConsoleState } from "../../store/console";

const LevelLine = ({
  level,
  height,
  touched = false,
  onPress,
}) => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
      onPress={onPress}
    >
      <View
        style={[
          {
            backgroundColor: color,
            shadowColor: color,
            height: height,
          },
          styles.lineStyle,
          touched ? styles.touched : null,
        ]}
      />
      <Text
        style={{
          color,
          fontSize: 25,
        }}
      >
        {level}
      </Text>
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
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default LevelLine;
