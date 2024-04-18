import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../utils/colors";
import BusyWrapper from "./Loader/BusyWrapper";
import appShadow from "../utils/appShadow";

const AuthButton = ({ title, busy, onPress }) => {
  const color = colors.dark.CONTRAST[0];
  const backgroundColor = colors.dark.SECONDARY;

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
          <Text
            {...{
              style: {
                color,
                fontSize: 25,
                textAlign: "center",
              },
            }}
          >
            {title}
          </Text>
        </BusyWrapper>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
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
