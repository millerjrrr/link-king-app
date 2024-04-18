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
  nologo,
}) => {
  const color = colors.dark.SECONDARY;
  const backgroundColor = colors.dark.PRIMARY;
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <>
        <View
          style={[
            styles.container,
            {
              backgroundColor,
              alignItems: !nologo ? "center" : "flex-start",
            },
          ]}
        >
          <StatusBarFiller />
          <FourCrowns {...{ color }} />
          {!nologo ? (
            <LinkKingLogo />
          ) : (
            <View style={{ height: 60 }} />
          )}
          <Text
            style={[
              styles.heading,
              { textAlign: !nologo ? "center" : "left" },
            ]}
          >
            {heading}
          </Text>
          {subHeading ? (
            <Text
              style={[
                styles.subHeading,
                { textAlign: !nologo ? "center" : "left" },
              ]}
            >
              {subHeading}
            </Text>
          ) : null}
          <View style={{ height: 10 }} />
          <AppNotification />
          {children}
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.dark.CONTRAST[0],
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  subHeading: {
    padding: 5,
    color: colors.dark.CONTRAST[0],
    fontSize: 16,
  },
});

export default AuthFormContainer;
