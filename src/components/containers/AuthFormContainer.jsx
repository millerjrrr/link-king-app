import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import colors from "../../utils/colors";
import AppNotification from "../AppNotification";
import FourCrowns from "../../ui/Graphics/FourCrowns";
import LinkKingLogo from "../../ui/Graphics/LinkKingLogo";
import StatusBarFiller from "../../ui/StatusBarFiller";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
}) => {
  const color = colors.dark.INACTIVE_CONTRAST;
  const backgroundColor = colors.dark.PRIMARY;
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <StatusBarFiller />
        <FourCrowns {...{ color }} />
        <LinkKingLogo />
        <Text style={styles.heading}>{heading}</Text>
        {subHeading ? (
          <Text style={styles.subHeading}>
            {subHeading}
          </Text>
        ) : null}
        <AppNotification />
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.dark.CONTRAST[0],
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 0,
    textAlign: "center",
  },
  subHeading: {
    color: colors.dark.CONTRAST[0],
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default AuthFormContainer;
