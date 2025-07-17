import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "@src/utils/colors";
import BusyWrapper from "../Loader/BusyWrapper";
import appShadow from "@src/utils/appShadow";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import AppText from "../AppText";

const AuthButton: React.FC<{
  title: string;
  busy?: boolean;
  onPress: () => void;
}> = ({ title, busy, onPress }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);

  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            ...appShadow(color),
            backgroundColor,
          },
        ]}
      >
        <BusyWrapper
          color={color}
          busy={!!busy}
          size={25}
          noFlex
        >
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
  },
});

export default AuthButton;
