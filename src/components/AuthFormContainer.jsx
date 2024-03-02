import {
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import colors from "../utils/colors";
import CrownUI from "../ui/CrownUI";
import AppNotification from "./AppNotification";

const AuthFormContainer = ({
  children,
  heading,
  subHeading,
}) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.PRIMARY }}
    >
      <CrownUI
        position="top-left"
        size="96"
        rotation="135"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="top-right"
        size="96"
        rotation="225"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="bottom-left"
        size="96"
        rotation="45"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="bottom-right"
        size="96"
        rotation="315"
        color={colors.INACTIVE_CONTRAST}
      />

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/link-king-header-logo.png")}
            resizeMode="contain"
            style={{
              marginTop: 50,
              height: 50,
              borderColor: colors.CONTRAST[0],
            }}
          />
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subHeading}>
            {subHeading}
          </Text>
        </View>
        <AppNotification />
        <View style={styles.childContainer}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    color: colors.CONTRAST[0],
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 0,
    transform: [{ translateY: -8 }],
  },
  subHeading: {
    color: colors.CONTRAST[0],
    fontSize: 13,
    textAlign: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  childContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default AuthFormContainer;
