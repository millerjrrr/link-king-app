import {
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import colors from "../utils/colors";
import CrownUI from "../ui/CrownUI";

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
        size="100"
        rotation="150"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="top-right"
        size="50"
        rotation="230"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="bottom-left"
        size="80"
        rotation="50"
        color={colors.INACTIVE_CONTRAST}
      />
      <CrownUI
        position="bottom-right"
        size="110"
        rotation="300"
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
              borderColor: colors.CONTRAST,
            }}
          />
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subHeading}>
            {subHeading}
          </Text>
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    paddingHorizontal: 15,
  },
  heading: {
    color: colors.CONTRAST,
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 0,
    transform: [{ translateY: -8 }],
  },
  subHeading: {
    color: colors.CONTRAST,
    fontSize: 13,
    textAlign: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
});

export default AuthFormContainer;
