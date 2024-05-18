import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BusyWrapper from "../Loader/BusyWrapper";
import { AntDesign } from "@expo/vector-icons";
import appShadow from "../../utils/appShadow";
import AppText from "../AppText";

const AppButton = ({
  title,
  name,
  color,
  backgroundColor,
  size,
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
            borderColor: color,
            width: size,
            backgroundColor,
          },
        ]}
      >
        <BusyWrapper {...{ color, busy, size: size / 3 }}>
          {title ? (
            <AppText
              {...{
                style: {
                  color,
                  fontSize: size / 7,
                },
              }}
            >
              {title}
            </AppText>
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
