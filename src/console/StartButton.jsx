import { Text, View, Pressable } from "react-native";
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
      <Pressable
        style={{
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: colors.INACTIVE_CONTRAST,
          height: size,
          width: size,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: colors.INACTIVE_CONTRAST,
            fontSize: 50,
          }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default StartButton;
