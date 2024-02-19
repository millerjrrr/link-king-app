import {
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import { useSelector } from "react-redux";
import { getConsoleState } from "../store/console";

const StartButton = ({ size, title, onPress }) => {
  const { golden } = useSelector(getConsoleState);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        zIndex: 10,
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: size / 2,
          backgroundColor: colors.SECONDARY,
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: colors.CONTRAST[golden],
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
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: colors.CONTRAST[golden],
            fontSize: size / 4,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartButton;
