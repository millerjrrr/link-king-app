import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import colors from "../utils/colors";
import BusyWrapper from "./Loader/BusyWrapper";
import { AntDesign } from "@expo/vector-icons";

const AppButton = ({
  title,
  name,
  color = colors.default.CONTRAST[0],
  backgroundColor = colors.default.SECONDARY,
  size = 200,
  busy,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            shadowColor: color,
            width: size,
            backgroundColor,
          },
        ]}
      >
        <BusyWrapper {...{ color, busy, size: size / 3 }}>
          {title ? (
            <Text
              {...{
                style: {
                  color,
                  fontSize: size / 5,
                  textAlign: "center",
                },
              }}
            >
              {title}
            </Text>
          ) : (
            <AntDesign
              {...{ name, size: size / 2, color }}
            />
          )}
        </BusyWrapper>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  button: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default AppButton;
