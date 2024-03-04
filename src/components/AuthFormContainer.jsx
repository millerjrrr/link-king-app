import { View, StyleSheet, Text } from "react-native";
import colors from "../utils/colors";
import AppNotification from "./AppNotification";
import FourCrowns from "../ui/graphics/FourCrowns";
import LinkKingLogo from "../ui/graphics/LinkKingLogo";
import StatusBarFiller from "../ui/StatusBarFiller";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
}) => {
  const color = colors.INACTIVE_CONTRAST;
  return (
    <View style={styles.container}>
      <StatusBarFiller />
      <FourCrowns {...{ color }} />
      <LinkKingLogo />
      <Text style={styles.heading}>{heading}</Text>
      {subHeading ? (
        <Text style={styles.subHeading}>{subHeading}</Text>
      ) : null}
      <AppNotification />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.CONTRAST[0],
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 0,
  },
  subHeading: {
    color: colors.CONTRAST[0],
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default AuthFormContainer;
