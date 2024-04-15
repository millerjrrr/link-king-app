import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../utils/colors";
import BusyWrapper from "./Loader/BusyWrapper";
import { AntDesign } from "@expo/vector-icons";
import appShadow from "../utils/appShadow";

const AppButton = ({
  title,
  name,
  color = colors.dark.CONTRAST[0],
  backgroundColor = colors.dark.SECONDARY,
  size = 200,
  busy,
  onPress,
  margin = 50,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            shadowColor: color,
            borderColor: color,
            width: size,
            margin,
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
    ...appShadow(1),
  },
});

export default AppButton;
