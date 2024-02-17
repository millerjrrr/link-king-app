import {
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from "../utils/colors";

const StartButton = ({ size, title, onPress }) => {
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
          shadowColor: colors.CONTRAST,
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
            color: colors.INACTIVE_CONTRAST,
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
