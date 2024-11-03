import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "@src/utils/colors";
import BusyWrapper from "../Loader/BusyWrapper";
import appShadow from "@src/utils/appShadow";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import AppText from "../AppText";

const AuthButton = ({ title, busy, onPress }) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );

  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            shadowColor: color,
            borderColor: color,
            backgroundColor,
          },
        ]}
      >
        <BusyWrapper {...{ color, busy, size: 25 }}>
          <AppText>{title}</AppText>
        </BusyWrapper>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 45,
    borderRadius: 20,
    ...appShadow(1),
  },
});

export default AuthButton;
